import { NavigationProp } from '@react-navigation/native';
import { RootRoutes } from './RootStackNavigator.types';

export enum AppRoutes {
  HOME = `${RootRoutes.PRIVATE}/home`,

  BILLS = `${RootRoutes.PRIVATE}/bills`,

  HISTORY = `${RootRoutes.PRIVATE}/history`,
  HISTORY_DETAILS = `${RootRoutes.PRIVATE}/history/details`,
}

export type AppStackParamList = {
  [AppRoutes.HOME]: undefined;
  [AppRoutes.BILLS]: undefined;
  [AppRoutes.HISTORY]: undefined;
  [AppRoutes.HISTORY_DETAILS]: { billId: string };
};

export type AppStackNavigationProps = NavigationProp<AppStackParamList>;
