import { getAuth } from '@react-native-firebase/auth';

export async function loginFirebase(email: string, password: string) {
  const { user } = await getAuth().signInWithEmailAndPassword(email, password);

  return {
    id: user.uid,
    email: user.email,
    name: user.displayName,
  };
}

export async function logoutFirebase() {
  await getAuth().signOut();
}
