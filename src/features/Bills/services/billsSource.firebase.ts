import {
  getFirestore,
  doc,
  setDoc,
  collection,
} from '@react-native-firebase/firestore';
import { getAuth } from '@react-native-firebase/auth';

import { COLLECTIONS } from '@core/config/firebase/collections';

import { Bill } from '../types';

export async function addBillFirebase(
  bill: Omit<Bill, 'id' | 'createdAt' | 'updatedAt'>,
) {
  const { currentUser } = getAuth();

  if (!currentUser) {
    throw new Error('User not authenticated');
  }

  const ref = doc(
    collection(
      getFirestore(),
      COLLECTIONS.USERS,
      currentUser.uid,
      COLLECTIONS.BILLS,
    ),
  );
  try {
    await setDoc(ref, {
      ...bill,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error adding bill: ', error);
    throw error;
  }
}
