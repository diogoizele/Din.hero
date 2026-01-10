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

export async function updateRecurringRuleFirebase(
  recurringRuleId: string,
  data: Partial<{ lastGeneratedAt: string }>,
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
    await setDoc(recurringRuleRef, data, { merge: true });
  } catch (error) {
    throw error;
  }
}
