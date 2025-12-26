import {
  getAuth,
  updateProfile,
  reload,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
} from '@react-native-firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from '@react-native-firebase/firestore';
import { COLLECTIONS } from '@core/config/firebase/collections';

export async function getCurrentUserFirebase() {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    return null;
  }

  const userDoc = await getDoc(
    doc(getFirestore(), COLLECTIONS.USERS, currentUser.uid),
  );

  if (!userDoc.exists()) {
    return null;
  }

  const userData = userDoc.data();

  return {
    id: currentUser.uid,
    email: currentUser.email,
    name: currentUser.displayName,
    ...userData,
  };
}

export async function loginFirebase(email: string, password: string) {
  const { user } = await signInWithEmailAndPassword(getAuth(), email, password);

  return {
    id: user.uid,
    email: user.email,
    name: user.displayName,
  };
}

export async function logoutFirebase() {
  await signOut(getAuth());
}

export type SignupParams = {
  email: string;
  password: string;
  name: string;
};

export async function signupFirebase({ email, name, password }: SignupParams) {
  const { user } = await createUserWithEmailAndPassword(
    getAuth(),
    email,
    password,
  );

  await updateProfile(user, { displayName: name });
  await reload(user);

  try {
    await setDoc(doc(getFirestore(), COLLECTIONS.USERS, user.uid), {
      email,
      name,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Error creating user document:', error);
    await deleteUser(user);
    throw error;
  }

  return {
    id: user.uid,
    email: user.email,
    name: user.displayName ?? name,
  };
}
