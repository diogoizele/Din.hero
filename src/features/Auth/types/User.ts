import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export interface User extends Partial<FirebaseAuthTypes.User> {
  id: string;
  email: string | null;
  name: string | null;
}
