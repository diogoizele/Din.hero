import { NavigationProp } from '@react-navigation/native';
import { RootRoutes } from './RootStackNavigator.types';

export enum PublicRoutes {
  FIRST_ACCESS = `${RootRoutes.PUBLIC}/first-access`,
  LOGIN = `${RootRoutes.PUBLIC}/login`,
  SIGNUP = `${RootRoutes.PUBLIC}/signup`,
}

export type PublicStackParamList = {
  [PublicRoutes.LOGIN]: undefined;
  [PublicRoutes.SIGNUP]: undefined;
  [PublicRoutes.FIRST_ACCESS]: undefined;
};

export type PublicStackNavigationProps = NavigationProp<PublicStackParamList>;
