import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export function authFirebaseToUserMapper(
  firebaseUser: FirebaseAuthTypes.User | null,
) {
  if (!firebaseUser) {
    return firebaseUser;
  }

  return {
    id: firebaseUser.uid,
    email: firebaseUser.email,
    name: firebaseUser.displayName,
  };
}
