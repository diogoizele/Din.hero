import { ParamListBase } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export enum AuthRoutes {
  FIRST_ACCESS = 'first-access',
  LOGIN = 'login',
  SIGNUP = 'signup',
  RESET_PASSWORD = 'reset-password',
}

export interface AuthParamsList extends ParamListBase {
  [AuthRoutes.FIRST_ACCESS]: undefined;
  [AuthRoutes.LOGIN]?: { email: string };
  [AuthRoutes.SIGNUP]: undefined;
  [AuthRoutes.RESET_PASSWORD]?: { email: string };
}

export type AuthScreenProps<T extends AuthRoutes> = NativeStackScreenProps<
  AuthParamsList,
  T
>;

export type AuthStackNavigation = NativeStackNavigationProp<AuthParamsList>;
