import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RegisterBill from '../screens/RegisterBill';
import { NavigationProp } from '@react-navigation/native';
import TabNavigator from './TabNavigator';

export type RootStackParamList = {
  Home: undefined;
  RegisterBill: undefined;
};

export type NavigationProps = Omit<NavigationProp<RootStackParamList>, 'state'>;

const StackNavigator = createNativeStackNavigator<RootStackParamList>();

function RootStackNavigator() {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name="Home"
        options={{ headerShown: false }}
        component={TabNavigator}
      />
      <StackNavigator.Screen
        name="RegisterBill"
        options={{ headerShown: false }}
        component={RegisterBill}
      />
    </StackNavigator.Navigator>
  );
}

export default RootStackNavigator;
