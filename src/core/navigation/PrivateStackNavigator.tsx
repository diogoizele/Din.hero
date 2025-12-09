import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProp } from '@react-navigation/native';

import RegisterBill from '@features/Bills/RegisterBill/RegisterBillView';
import History from '@features/History/HistoryView';
import TabNavigator from './TabNavigator';
import {
  PrivateRoutes,
  PrivateStackParamList,
} from './PrivateStackNavigator.types';

export type NavigationProps = Omit<
  NavigationProp<PrivateStackParamList>,
  'state'
>;

const StackNavigator = createNativeStackNavigator<PrivateStackParamList>();

const defaultScreenOptions = {
  headerShown: false,
};

function PrivateStackNavigator() {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name={PrivateRoutes.HOME}
        options={defaultScreenOptions}
        component={TabNavigator}
      />
      <StackNavigator.Screen
        name={PrivateRoutes.BILLS}
        options={defaultScreenOptions}
        component={RegisterBill}
      />
      <StackNavigator.Screen
        name={PrivateRoutes.HISTORY}
        options={defaultScreenOptions}
        component={History}
      />
    </StackNavigator.Navigator>
  );
}

export default PrivateStackNavigator;
