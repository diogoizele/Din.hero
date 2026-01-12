import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProp } from '@react-navigation/native';

import RegisterBill from '@features/Bills/screens/RegisterBillView';
import History from '@features/History/screens/HistoryView';
import HistoryDetails from '@features/History/screens/HistoryDetailsView';
import EditBillView from '@features/Bills/screens/EditBillView';

import TabNavigator from './TabNavigator';
import { AppRoutes, AppStackParamList } from './PrivateStackNavigator.types';
import RecurringRulesListView from '../../features/RecurringRules/screens/RecurringRulesListView';

export type NavigationProps = Omit<NavigationProp<AppStackParamList>, 'state'>;

const StackNavigator = createNativeStackNavigator<AppStackParamList>();

const defaultScreenOptions = {
  headerShown: false,
};

function PrivateStackNavigator() {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name={AppRoutes.HOME}
        options={defaultScreenOptions}
        component={TabNavigator}
      />
      <StackNavigator.Screen
        name={AppRoutes.BILLS}
        options={defaultScreenOptions}
        component={RegisterBill}
      />
      <StackNavigator.Screen
        name={AppRoutes.BILLS_EDIT}
        options={defaultScreenOptions}
        component={EditBillView}
      />
      <StackNavigator.Screen
        name={AppRoutes.HISTORY}
        options={defaultScreenOptions}
        component={History}
      />
      <StackNavigator.Screen
        name={AppRoutes.HISTORY_DETAILS}
        options={defaultScreenOptions}
        component={HistoryDetails}
      />
      <StackNavigator.Screen
        name={AppRoutes.RECURRING_RULES}
        options={defaultScreenOptions}
        component={RecurringRulesListView}
      />
    </StackNavigator.Navigator>
  );
}

export default PrivateStackNavigator;
