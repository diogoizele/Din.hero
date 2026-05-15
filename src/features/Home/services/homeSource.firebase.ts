import {
  collection,
  FirebaseFirestoreTypes,
  getCountFromServer, getDocs,
  getFirestore,
  orderBy,
  query,
  where,
} from '@react-native-firebase/firestore';
import { addDays, endOfDay, startOfDay } from 'date-fns';

import { COLLECTIONS, requireAuth } from '@core/config/firebase';
import { getOnlyDatePart, localDateString } from '@shared/helpers/date';
import { Bill } from '@features/Bills/types';

import { HomeSummaryResponse } from './homeService.types';
import { UpcomingMoment } from '../types';

export async function getHomeSummaryFirebase(): Promise<HomeSummaryResponse> {
  const { currentUser } = requireAuth();

  const db = getFirestore();

  const billsRef = collection(
    db,
    COLLECTIONS.USERS,
    currentUser.uid,
    COLLECTIONS.BILLS
  );

  const now = new Date(localDateString());
  const todayStr = getOnlyDatePart(now);
  const in30DaysStr = getOnlyDatePart(endOfDay(addDays(now, 30)));
  const monthStartStr = getOnlyDatePart(startOfDay(new Date(now.getFullYear(), now.getMonth(), 1)));
  const monthEndStr = getOnlyDatePart(endOfDay(new Date(now.getFullYear(), now.getMonth() + 1, 0)));

  const [upcomingSnapshot, overdueCountSnap, monthlyTotalSnap, monthlyPaidSnap] =
    await Promise.all([
      // Upcoming: docs necessários (amount + dueDate para upcomingMoment)
      getDocs(
        query(
          billsRef,
          where('dueDate', '>=', todayStr),
          where('dueDate', '<=', in30DaysStr),
          where('paymentDate', '==', null),
          orderBy('dueDate', 'asc'),
        ),
      ),

      // Overdue: apenas contagem
      getCountFromServer(
        query(
          billsRef,
          where('dueDate', '<', todayStr),
          where('paymentDate', '==', null),
        ),
      ),

      // Total do mês: apenas contagem
      getCountFromServer(
        query(
          billsRef,
          where('dueDate', '>=', monthStartStr),
          where('dueDate', '<=', monthEndStr),
        ),
      ),

      // Pagas no mês: apenas contagem
      getCountFromServer(
        query(
          billsRef,
          where('dueDate', '>=', monthStartStr),
          where('dueDate', '<=', monthEndStr),
          where('paymentDate', '!=', null),
        ),
      ),
    ]);

  const upcomingBills = upcomingSnapshot.docs.map(
    (doc: FirebaseFirestoreTypes.QueryDocumentSnapshot) => ({ id: doc.id, ...doc.data() } as Bill),
  ) as Bill[];

  const overdue = overdueCountSnap.data().count;
  const monthlyTotal = monthlyTotalSnap.data().count;
  const monthlyPaid = monthlyPaidSnap.data().count;
  const { upcoming, upcomingMoment } = getMomentForUpcomingBills(upcomingBills) ?? {
    upcoming: 0, upcomingMoment: null,
  };

  const progress = { paid: monthlyPaid, total: monthlyTotal };

  return {
    totalUpcomingAmount: upcomingBills.reduce((sum, bill) => sum + (bill.amount ?? 0), 0),
    alerts: {
      overdue,
      upcoming,
      upcomingMoment,
    },
    score: calculateFinancialScore(overdue, upcomingBills.length, upcomingMoment, progress),
    progress,
  };
}

function getMomentForUpcomingBills(upcomingBills: Bill[]) {
  const now = new Date(localDateString());
  const tomorrow = addDays(now, 1);
  const weekFromNow = addDays(now, 7);

  const upcomingToday = upcomingBills.filter(bill => {
    const dueDate = new Date(bill.dueDate);

    return dueDate >= startOfDay(now) && dueDate <= endOfDay(now);
  });


  if (upcomingToday.length > 0) {
    return {
      upcoming: upcomingToday.length,
      upcomingMoment: UpcomingMoment.Today,
    } as const;
  }

  const upcomingTomorrow = upcomingBills.filter(bill => {
    const dueDate = new Date(bill.dueDate);
    return dueDate >= startOfDay(tomorrow) && dueDate <= endOfDay(tomorrow);
  });

  if (upcomingTomorrow.length > 0) {
    return {
      upcoming: upcomingTomorrow.length,
      upcomingMoment: UpcomingMoment.Tomorrow,
    } as const;
  }

  const upcomingWeek = upcomingBills.filter(bill => {
    const dueDate = new Date(bill.dueDate);
    return dueDate >= startOfDay(now) && dueDate <= endOfDay(weekFromNow);
  });

  if (upcomingWeek.length > 0) {
    return {
      upcoming: upcomingWeek.length,
      upcomingMoment: UpcomingMoment.Week,
    } as const;
  }

  return null;
}


/**
 * Produz um score de 0–10 com base na situação financeira atual.
 *
 * Pesos:
 *  Overdue          → fator dominante (0–6 pts)
 *  Urgência (hoje/amanhã/semana) → (0–3 pts)
 *  Volume de upcoming            → (0–2 pts)
 *  Baixo progresso mensal        → (0–1 pt, apenas sem overdue)
 *
 * Exemplos:
 *  0 overdue, nada vence essa semana          → 0–2  (excellent)
 *  0 overdue, vence amanhã, poucas contas     → 3–4  (stable)
 *  0 overdue, vence hoje, 5+ contas           → 5    (warning)
 *  1 overdue                                  → 5–7  (warning → high-warning)
 *  2 overdue                                  → 6–9  (warning → critical)
 *  3+ overdue + vence hoje                    → 10   (emergency)
 */
export function calculateFinancialScore(
  overdue: number,
  upcoming: number,
  upcomingMoment: UpcomingMoment | null,
  progress: { paid: number; total: number },
): number {
  let score = 0;

  // --- Overdue: fator principal ---
  if (overdue === 1) { score += 4; }
  else if (overdue === 2) { score += 5; }
  else if (overdue >= 3) { score += 6; }

  // --- Urgência do próximo vencimento ---
  if (upcomingMoment === UpcomingMoment.Today) { score += 3; }
  else if (upcomingMoment === UpcomingMoment.Tomorrow) { score += 2; }
  else if (upcomingMoment === UpcomingMoment.Week) { score += 1; }

  // --- Volume de contas a vencer ---
  if (upcoming >= 5) { score += 2; }
  else if (upcoming >= 2) { score += 1; }

  // --- Progresso mensal fraco (sem overdue) ---
  if (overdue === 0 && progress.total > 0) {
    const unpaidRatio = (progress.total - progress.paid) / progress.total;
    if (unpaidRatio > 0.6) { score += 1; }
  }

  return Math.min(10, score);
}

