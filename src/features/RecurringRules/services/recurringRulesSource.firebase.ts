import {
  collection,
  doc,
  FirebaseFirestoreTypes,
  getDocs,
  getFirestore,
  setDoc,
} from '@react-native-firebase/firestore';

import { requireAuth } from '@core/config/firebase/utils';
import { COLLECTIONS } from '@core/config/firebase/collections';
import { RecurringRule } from '../types/RecurringRule';

export async function listRecurringRulesFirebase() {
  const { currentUser } = requireAuth();

  const db = getFirestore();

  const recurringRules = collection(
    db,
    COLLECTIONS.USERS,
    currentUser.uid,
    COLLECTIONS.RECURRING_RULES,
  );

  const snapshot = await getDocs(recurringRules);

  const rules = snapshot.docs.map(
    (doc: FirebaseFirestoreTypes.QueryDocumentSnapshot) => ({
      id: doc.id,
      ...doc.data(),
    }),
  );

  return rules;
}

export async function listRuleByIdFirebase(id: string): Promise<RecurringRule> {
  const { currentUser } = requireAuth();

  const db = getFirestore();

  const recurringRuleRef = doc(
    db,
    COLLECTIONS.USERS,
    currentUser.uid,
    COLLECTIONS.RECURRING_RULES,
    id,
  );

  const snapshot = await getDocs(recurringRuleRef);

  if (!snapshot.exists()) {
    throw new Error('Recurring rule not found');
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as RecurringRule;
}

export async function updateRecurringRuleFirebase(
  recurringRuleId: string,
  updates: Partial<Omit<RecurringRule, 'id' | 'createdAt' | 'updatedAt'>>,
) {
  const { currentUser } = requireAuth();

  const db = getFirestore();

  const recurringRuleRef = doc(
    db,
    COLLECTIONS.USERS,
    currentUser.uid,
    COLLECTIONS.RECURRING_RULES,
    recurringRuleId,
  );

  try {
    await setDoc(
      recurringRuleRef,
      {
        ...updates,
        updatedAt: new Date().toISOString(),
      },
      { merge: true },
    );
  } catch (error) {
    throw error;
  }
}

export async function deleteRecurringRuleFirebase(recurringRuleId: string) {
  const { currentUser } = requireAuth();
  const db = getFirestore();

  const recurringRuleRef = doc(
    db,
    COLLECTIONS.USERS,
    currentUser.uid,
    COLLECTIONS.RECURRING_RULES,
    recurringRuleId,
  );

  try {
    await recurringRuleRef.delete();
  } catch (error) {
    throw error;
  }
}
