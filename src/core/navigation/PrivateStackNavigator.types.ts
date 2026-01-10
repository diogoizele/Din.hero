import { NavigationProp } from '@react-navigation/native';

import { RootRoutes } from './RootStackNavigator.types';
import { Bill } from '@features/Bills/types';

export enum AppRoutes {
  HOME = `${RootRoutes.PRIVATE}/home`,

  BILLS = `${RootRoutes.PRIVATE}/bills`,
  BILLS_EDIT = `${RootRoutes.PRIVATE}/bills/edit`,

  HISTORY = `${RootRoutes.PRIVATE}/history`,
  HISTORY_DETAILS = `${RootRoutes.PRIVATE}/history/details`,
}

export type AppStackParamList = {
  [AppRoutes.HOME]: undefined;
  [AppRoutes.BILLS]: undefined;
  [AppRoutes.HISTORY]: undefined;
  [AppRoutes.HISTORY_DETAILS]: { billId: string };
  [AppRoutes.BILLS_EDIT]: { bill: Bill };
};

export type AppStackNavigationProps = NavigationProp<AppStackParamList>;
