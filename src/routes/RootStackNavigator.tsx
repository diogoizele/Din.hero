import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RegisterBill from '../screens/RegisterBill/RegisterBillView';
import { NavigationProp } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import History from '../screens/History/HistoryView';

export type RootStackParamList = {
  Home: undefined;
  RegisterBill: undefined;
  History: undefined;
};

export type NavigationProps = Omit<NavigationProp<RootStackParamList>, 'state'>;

const StackNavigator = createNativeStackNavigator<RootStackParamList>();

const defaultScreenOptions = {
  headerShown: false,
};

function RootStackNavigator() {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name="Home"
        options={defaultScreenOptions}
        component={TabNavigator}
      />
      <StackNavigator.Screen
        name="RegisterBill"
        options={defaultScreenOptions}
        component={RegisterBill}
      />
      <StackNavigator.Screen
        name="History"
        options={defaultScreenOptions}
        component={History}
      />
    </StackNavigator.Navigator>
  );
}

export default RootStackNavigator;
