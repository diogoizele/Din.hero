import { getAuth } from '@react-native-firebase/auth';

export function requireAuth() {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error('User not authenticated');
  }

  return {
    currentUser,
  };
}
