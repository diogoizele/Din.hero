import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProp } from '@react-navigation/native';

import RegisterBill from '@features/Bills/screens/RegisterBillView';
import History from '@features/History/HistoryView';
import TabNavigator from './TabNavigator';
import {
  AppRoutes,
  AppStackParamList,
} from './PrivateStackNavigator.types';

export type NavigationProps = Omit<
  NavigationProp<AppStackParamList>,
  'state'
>;

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
        name={AppRoutes.HISTORY}
        options={defaultScreenOptions}
        component={History}
      />
    </StackNavigator.Navigator>
  );
}

export default PrivateStackNavigator;
