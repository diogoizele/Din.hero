import {
  getAuth,
  updateProfile,
  reload,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@react-native-firebase/auth';

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

  return {
    id: user.uid,
    email: user.email,
    name: user.displayName ?? name,
  };
}
