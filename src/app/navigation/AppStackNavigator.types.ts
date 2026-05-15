import { NavigationProp } from '@react-navigation/native';

import { Bill, BillType } from '@features/Bills/types';
import { RecurringRule } from '@features/RecurringRules/types';

export enum AppRoutes {
  HOME = 'home',
  HOME_TAB = 'home-tab',
  MENU_TAB = 'menu-tab',

  BILLS = 'bills',
  BILLS_EDIT = 'bills/edit',

  HISTORY = 'history',
  HISTORY_DETAILS = 'history/details',

  RECURRING_RULES = 'recurring-rules',
  RECURRING_RULE_DETAILS = 'recurring-rules/details',
  RECURRING_RULE_EDIT = 'recurring-rules/edit',
}

export type AppStackParamList = {
  [AppRoutes.HOME]: undefined;
  [AppRoutes.BILLS]?: { billType?: BillType };
  [AppRoutes.HISTORY]: undefined;
  [AppRoutes.HISTORY_DETAILS]: { billId: string };
  [AppRoutes.BILLS_EDIT]: { bill: Bill };
  [AppRoutes.RECURRING_RULES]: undefined;
  [AppRoutes.RECURRING_RULE_DETAILS]: { recurringRuleId: string };
  [AppRoutes.RECURRING_RULE_EDIT]: { recurringRule: RecurringRule };
};

export type AppStackNavigationProps = NavigationProp<AppStackParamList>;
