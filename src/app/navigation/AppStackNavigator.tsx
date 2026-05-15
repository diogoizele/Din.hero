import { NavigationProp } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';

import { createStackNavigator } from '@core';
import { useTheme } from '@shared/hooks';
import RegisterBill from '@features/Bills/screens/RegisterBillView';
import History from '@features/History/screens/HistoryView';
import HistoryDetails from '@features/History/screens/HistoryDetailsView';
import EditBillView from '@features/Bills/screens/EditBillView';
import RecurringRulesListView from '@features/RecurringRules/screens/RecurringRulesListView';
import RecurringRuleDetailsView from '@features/RecurringRules/screens/RecurringRuleDetailsView';
import EditRecurringRuleView from '@features/RecurringRules/screens/EditRecurringRuleView';

import TabNavigator from './TabNavigator';
import { AppRoutes, AppStackParamList } from './AppStackNavigator.types';

export type NavigationProps = Omit<NavigationProp<AppStackParamList>, 'state'>;

const Stack = createStackNavigator<AppStackParamList>();

export const AppStackNavigator = () => {
  const theme = useTheme();

  const screenOptions = {
    title: '',
    headerStyle: {
      backgroundColor: theme.colors.background,
    },
    headerTintColor: theme.colors.textPrimary,
    headerShadowVisible: false,
    headerBackTitleVisible: false,
    headerBackButtonDisplayMode: 'minimal',
    headerBackTitle: '',
  } as StackNavigationOptions;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AppRoutes.HOME}
        options={{ headerShown: false }}
        component={TabNavigator}
      />
      <Stack.Screen
        name={AppRoutes.BILLS}
        options={{ ...screenOptions, headerTitle: 'Cadastrar conta' }}
        component={RegisterBill}
      />
      <Stack.Screen
        name={AppRoutes.BILLS_EDIT}
        options={screenOptions}
        component={EditBillView}
      />
      <Stack.Screen
        name={AppRoutes.HISTORY}
        options={{ ...screenOptions, headerTitle: 'Histórico' }}
        component={History}
      />
      <Stack.Screen
        name={AppRoutes.HISTORY_DETAILS}
        options={{ ...screenOptions, headerTitle: 'Detalhes da conta' }}
        component={HistoryDetails}
      />
      <Stack.Screen
        name={AppRoutes.RECURRING_RULES}
        options={screenOptions}
        component={RecurringRulesListView}
      />
      <Stack.Screen
        name={AppRoutes.RECURRING_RULE_DETAILS}
        options={screenOptions}
        component={RecurringRuleDetailsView}
      />
      <Stack.Screen
        name={AppRoutes.RECURRING_RULE_EDIT}
        options={screenOptions}
        component={EditRecurringRuleView}
      />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
