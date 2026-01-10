import { getAuth } from '@react-native-firebase/auth';
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
import { getOnlyDatePart } from '@core/helpers/date';

import { Bill, RecurringRule } from '../types';

export async function addBillFirebase(
  bill: Omit<Bill, 'id' | 'createdAt' | 'updatedAt'>,
) {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error('User not authenticated');
  }

  const db = getFirestore();

  const billRef = doc(
    collection(db, COLLECTIONS.USERS, currentUser.uid, COLLECTIONS.BILLS),
  );

  const now = new Date().toISOString();

  try {
    await setDoc(billRef, {
      ...bill,
      createdAt: now,
      updatedAt: now,
    });
  } catch (error) {
    throw error;
  }
}

export async function addRecurringRuleAndBillFirebase(
  recurringRule: Omit<RecurringRule, 'id' | 'createdAt' | 'updatedAt'>,
  bill: Omit<Bill, 'id' | 'createdAt' | 'updatedAt'>,
) {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error('User not authenticated');
  }

  const db = getFirestore();

  const recurringRuleRef = doc(
    collection(
      db,
      COLLECTIONS.USERS,
      currentUser.uid,
      COLLECTIONS.RECURRING_RULES,
    ),
  );

  const billRef = doc(
    collection(db, COLLECTIONS.USERS, currentUser.uid, COLLECTIONS.BILLS),
  );

  const now = new Date().toISOString();

  const batch = writeBatch(db);

  batch.set(recurringRuleRef, {
    ...recurringRule,
    lastGeneratedAt: now,
    createdAt: now,
    updatedAt: now,
  });

  batch.set(billRef, {
    ...bill,
    recurringRuleId: recurringRuleRef.id,
    createdAt: now,
    updatedAt: now,
  });

  try {
    await batch.commit();
  } catch (error) {
    console.error('Error adding recurring rule and bill: ', error);
    throw error;
  }
}

type ListBillsParams = {
  startDate: string;
  endDate: string;
  onlyUnpaid?: boolean;
};

export async function listBillsByDateRangeFirebase({
  startDate,
  endDate,
  onlyUnpaid = true,
}: ListBillsParams): Promise<Bill[]> {
  const currentUser = getAuth().currentUser;
  if (!currentUser) throw new Error('User not authenticated');

  const db = getFirestore();
  const billsCollection = collection(
    db,
    COLLECTIONS.USERS,
    currentUser.uid,
    COLLECTIONS.BILLS,
  );

  const constraints: QueryConstraint[] = [
    // @ts-ignore
    where('dueDate', '<=', getOnlyDatePart(endDate)),
    // @ts-ignore
    where('dueDate', '>=', getOnlyDatePart(startDate)),
    // @ts-ignore
    orderBy('dueDate', 'asc'),
  ];

  if (onlyUnpaid) {
    // @ts-ignore
    constraints.push(where('paymentDate', '==', null));
  }

  const billsQuery = query(billsCollection, ...constraints);
  const snapshot = await getDocs(billsQuery);

  return snapshot.docs.map(
    (doc: FirebaseFirestoreTypes.QueryDocumentSnapshot) =>
      ({ id: doc.id, ...doc.data() } as Bill),
  );
}

type ListBillsPaginatedParams = {
  pageSize: number;
  lastDoc?: FirebaseFirestoreTypes.QueryDocumentSnapshot;
  sortOption?: 'dueDate' | 'createdAt' | 'paymentDate';
};

export async function listBillPaginatedFirebase({
  pageSize,
  lastDoc,
  sortOption,
}: ListBillsPaginatedParams) {
  const currentUser = getAuth().currentUser;
  if (!currentUser) throw new Error('User not authenticated');

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

  const constraint: QueryConstraint[] = [
    // @ts-ignore
    ...mapSortOptionToOrderBy[sortOption ?? 'dueDate'],
    // @ts-ignore
    limit(pageSize),
  ];

  if (lastDoc) {
    // @ts-ignore
    constraint.push(startAfter(lastDoc));
  }

  const billsQuery = query(billsCollection, ...constraint);
  const snapshot = await getDocs(billsQuery);

  const newLastDoc = snapshot.docs.map(
    (doc: FirebaseFirestoreTypes.QueryDocumentSnapshot) =>
      ({ id: doc.id, ...doc.data() } as Bill),
  );

  return {
    bills: newLastDoc,
    lastDoc: snapshot.docs[snapshot.docs.length - 1],
  };
}

export async function listBillByIdFirebase(id: string): Promise<Bill> {
  const currentUser = getAuth().currentUser;
  if (!currentUser) throw new Error('User not authenticated');

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

export async function updateBillFirebase(
  billId: string,
  updates: Partial<Omit<Bill, 'id' | 'createdAt'>>,
) {
  const currentUser = getAuth().currentUser;
  if (!currentUser) throw new Error('User not authenticated');

  const db = getFirestore();
  const billRef = doc(
    db,
    COLLECTIONS.USERS,
    currentUser.uid,
    COLLECTIONS.BILLS,
    billId,
  );

  try {
    await setDoc(
      billRef,
      {
        ...updates,
        updatedAt: new Date().toISOString(),
      },
      { merge: true },
    );
  } catch (error) {
    console.error('Error updating bill: ', error);
    throw error;
  }
}
