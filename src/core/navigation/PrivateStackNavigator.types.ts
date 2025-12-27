import { NavigationProp } from '@react-navigation/native';
import { RootRoutes } from './RootStackNavigator.types';

export enum AppRoutes {
  HOME = `${RootRoutes.PRIVATE}/home`,
  BILLS = `${RootRoutes.PRIVATE}/bills`,

  HISTORY = `${RootRoutes.PRIVATE}/history`,
}

export type AppStackParamList = {
  [AppRoutes.HOME]: undefined;
  [AppRoutes.BILLS]: undefined;
  [AppRoutes.HISTORY]: undefined;
};

export type AppStackNavigationProps = NavigationProp<AppStackParamList>;
