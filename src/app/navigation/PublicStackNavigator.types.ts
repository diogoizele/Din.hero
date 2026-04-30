import {
  NavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/native';

import { AuthParamsList } from '@features/Auth';
import { TermsParamsList } from '@features/Terms';

export enum PublicRoutes {
  AUTH = 'auth',
  TERMS = 'terms',
}

export type PublicStackParamList = {
  [PublicRoutes.AUTH]: NavigatorScreenParams<AuthParamsList>;
  [PublicRoutes.TERMS]: NavigatorScreenParams<TermsParamsList>;
};

export type PublicStackNavigationProps = NavigationProp<PublicStackParamList>;
