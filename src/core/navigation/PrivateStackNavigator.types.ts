import { NavigationProp } from '@react-navigation/native';

import { Bill } from '@features/Bills/types';
import { RecurringRule } from '@features/RecurringRules/types';

import { RootRoutes } from './RootStackNavigator.types';

export enum AppRoutes {
  HOME = `${RootRoutes.PRIVATE}/home`,
  HOME_TAB = `${RootRoutes.PRIVATE}/home-tab`,
  MENU_TAB = `${RootRoutes.PRIVATE}/menu-tab`,

  BILLS = `${RootRoutes.PRIVATE}/bills`,
  BILLS_EDIT = `${RootRoutes.PRIVATE}/bills/edit`,

  HISTORY = `${RootRoutes.PRIVATE}/history`,
  HISTORY_DETAILS = `${RootRoutes.PRIVATE}/history/details`,

  RECURRING_RULES = `${RootRoutes.PRIVATE}/recurring-rules`,
  RECURRING_RULE_DETAILS = `${RootRoutes.PRIVATE}/recurring-rules/details`,
  RECURRING_RULE_EDIT = `${RootRoutes.PRIVATE}/recurring-rules/edit`,
}

export type AppStackParamList = {
  [AppRoutes.HOME]: undefined;
  [AppRoutes.BILLS]: undefined;
  [AppRoutes.HISTORY]: undefined;
  [AppRoutes.HISTORY_DETAILS]: { billId: string };
  [AppRoutes.BILLS_EDIT]: { bill: Bill };
  [AppRoutes.RECURRING_RULES]: undefined;
  [AppRoutes.RECURRING_RULE_DETAILS]: { recurringRuleId: string };
  [AppRoutes.RECURRING_RULE_EDIT]: { recurringRule: RecurringRule };
};

export type AppStackNavigationProps = NavigationProp<AppStackParamList>;
