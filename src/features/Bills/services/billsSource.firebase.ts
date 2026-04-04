import {
  getFirestore,
  collection,
  doc,
  setDoc,
  writeBatch,
  where,
  orderBy,
  query,
  getDocs,
  FirebaseFirestoreTypes,
  QueryConstraint,
  limit,
  startAfter,
  getDoc,
} from '@react-native-firebase/firestore';

import { COLLECTIONS } from '@core/config/firebase/collections';
import {
  getDayFromDateOnly,
  getOnlyDatePart,
  localDateString,
} from '@shared/helpers/date';
import { requireAuth } from '@core/config/firebase/utils';
import { RecurringRule } from '@features/RecurringRules/types/RecurringRule';

import { Bill, BillType } from '../types';
import {
  AddBillData,
  ListBillsPaginatedParams,
  ListBillsParams,
  UpdateBillData,
} from './billsService.types';
import { undefinedResolver } from '../../../shared/helpers/guards';

export async function addBillFirebase(
  bill: AddBillData,
  isRecurring: boolean = false,
) {
  const { currentUser } = requireAuth();

  const db = getFirestore();

  const billRef = doc(
    collection(db, COLLECTIONS.USERS, currentUser.uid, COLLECTIONS.BILLS),
  );

  const now = new Date();

  const batch = writeBatch(db);

  let recurringRuleId = null;

  if (isRecurring) {
    const newRecurringRule = {
      description: bill.description,
      category: bill.category,
      fixedAmount: bill.amount,
      notes: bill.notes,
      startDate: bill.dueDate,

      dayOfMonth: getDayFromDateOnly(bill.dueDate),
      lastGeneratedDate: localDateString(),

      endDate: null,
      active: true,

      createdAt: now,
      updatedAt: now,
    };

    const recurringRuleRef = doc(
      collection(
        db,
        COLLECTIONS.USERS,
        currentUser.uid,
        COLLECTIONS.RECURRING_RULES,
      ),
    );
    recurringRuleId = recurringRuleRef.id;

    batch.set(recurringRuleRef, newRecurringRule);
  }

  const newBill = {
    ...bill,
    recurringRuleId,
    createdAt: now,
    updatedAt: now,
  };

  batch.set(billRef, newBill);

  await batch.commit();

  return { id: billRef.id, ...newBill } as Bill;
}

export async function listBillsByDateRangeFirebase({
  startDate,
  endDate,
  onlyUnpaid = true,
}: ListBillsParams): Promise<Bill[]> {
  const { currentUser } = requireAuth();

  const db = getFirestore();
  const billsCollection = collection(
    db,
    COLLECTIONS.USERS,
    currentUser.uid,
    COLLECTIONS.BILLS,
  );

  const constraints = [
    where('dueDate', '<=', getOnlyDatePart(endDate)),
    where('dueDate', '>=', getOnlyDatePart(startDate)),
    orderBy('dueDate', 'asc'),
  ];

  if (onlyUnpaid) {
    constraints.push(where('paymentDate', '==', null));
  }

  const billsQuery = query(
    billsCollection,
    ...(constraints as QueryConstraint[]),
  );
  const snapshot = await getDocs(billsQuery);

  return snapshot.docs.map(
    (document: FirebaseFirestoreTypes.QueryDocumentSnapshot) =>
      ({ id: document.id, ...document.data() } as Bill),
  );
}

export async function listBillPaginatedFirebase({
  pageSize,
  lastDoc,
  sortOption,
}: ListBillsPaginatedParams) {
  const { currentUser } = requireAuth();

  const db = getFirestore();

  const billsCollection = collection(
    db,
    COLLECTIONS.USERS,
    currentUser.uid,
    COLLECTIONS.BILLS,
  );

  const mapSortOptionToOrderBy: Record<
    NonNullable<ListBillsPaginatedParams['sortOption']>,
    any
  > = {
    dueDate: [orderBy('dueDate', 'asc')],
    createdAt: [orderBy('createdAt', 'asc')],
    paymentDate: [orderBy('paymentDate', 'desc'), orderBy('dueDate', 'asc')],
  };

  const constraint = [
    ...mapSortOptionToOrderBy[sortOption ?? 'dueDate'],
    limit(pageSize),
  ];

  if (lastDoc) {
    constraint.push(startAfter(lastDoc));
  }

  const billsQuery = query(billsCollection, ...constraint);
  const snapshot = await getDocs(billsQuery);

  const newLastDoc = snapshot.docs.map(
    (document: FirebaseFirestoreTypes.QueryDocumentSnapshot) =>
      ({ id: document.id, ...document.data() } as Bill),
  );

  return {
    bills: newLastDoc,
    lastDoc: snapshot.docs[snapshot.docs.length - 1],
  };
}

export async function listBillByIdFirebase(id: string): Promise<Bill> {
  const { currentUser } = requireAuth();

  const db = getFirestore();
  const billRef = doc(
    db,
    COLLECTIONS.USERS,
    currentUser.uid,
    COLLECTIONS.BILLS,
    id,
  );

  const billSnap = await getDoc(billRef);

  if (!billSnap.exists) {
    throw new Error('Bill not found');
  }

  return { id: billSnap.id, ...billSnap.data() } as Bill;
}

export async function updateBillFirebase(id: string, data: UpdateBillData) {
  const { currentUser } = requireAuth();

  const db = getFirestore();

  const billRef = doc(
    db,
    COLLECTIONS.USERS,
    currentUser.uid,
    COLLECTIONS.BILLS,
    id,
  );

  const updatedBill: UpdateBillData = {
    amount: data.amount,
    category: data.category,
    description: data.description,
    dueDate: undefinedResolver(data.dueDate),
    notes: data.description,
  };

  await setDoc(
    billRef,
    {
      ...updatedBill,
      updatedAt: new Date(),
    },
    { merge: true },
  );

  return {
    id: billRef.id,
    ...updatedBill,
  } as Bill;
}

export async function deleteBillFirebase(id: string) {
  const { currentUser } = requireAuth();

  const billRef = doc(
    getFirestore(),
    COLLECTIONS.USERS,
    currentUser.uid,
    COLLECTIONS.BILLS,
    id,
  );

  await billRef.delete();
}

export async function createBillIfPendingFirebase(recurringRuleId: string) {
  const { currentUser } = requireAuth();

  const db = getFirestore();
  const recurringRuleRef = doc(
    db,
    COLLECTIONS.USERS,
    currentUser.uid,
    COLLECTIONS.RECURRING_RULES,
    recurringRuleId,
  );

  const recurringRuleSnap = await getDoc(recurringRuleRef);

  if (!recurringRuleSnap.exists) {
    throw new Error('Recurring rule not found');
  }

  const recurringRule = recurringRuleSnap.data() as RecurringRule;

  if (!recurringRule.active) {
    return;
  }

  const billsCollection = collection(
    db,
    COLLECTIONS.USERS,
    currentUser.uid,
    COLLECTIONS.BILLS,
  );

  const lastMonthDate = new Date();
  lastMonthDate.setMonth(lastMonthDate.getMonth() + 1);

  const constraints = [
    where('dueDate', '>=', localDateString()),
    where('recurringRuleId', '==', recurringRuleId),
    orderBy('dueDate', 'asc'),
  ];

  const billsQuery = query(
    billsCollection,
    ...(constraints as QueryConstraint[]),
  );

  const snapshot: FirebaseFirestoreTypes.QuerySnapshot<Bill> = await getDocs(
    billsQuery,
  );

  const alreadyExists = snapshot.docs.length > 0;

  console.log({ alreadyExists });

  if (alreadyExists) {
    return;
  }

  const billRef = doc(
    collection(db, COLLECTIONS.USERS, currentUser.uid, COLLECTIONS.BILLS),
  );

  const dueDate = new Date();
  dueDate.setDate(recurringRule.dayOfMonth);
  const monthsToAdd =
    getDayFromDateOnly(localDateString()) > recurringRule.dayOfMonth ? 1 : 0;
  dueDate.setMonth(dueDate.getMonth() + monthsToAdd);

  const newBill: Omit<Bill, 'id'> = {
    amount: recurringRule.fixedAmount,
    billType: BillType.RECURRING,
    category: recurringRule.category,
    description: recurringRule.description,
    notes: recurringRule.notes,
    dueDate: localDateString(dueDate),
    installment: null,
    paymentDate: null,
    recurringRuleId,
  };

  const batch = writeBatch(db);

  batch.set(billRef, newBill);
  batch.set(
    recurringRuleRef,
    {
      lastGeneratedDate: localDateString(),
    },
    { merge: true },
  );

  await batch.commit();
}
