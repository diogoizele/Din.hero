import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import RegisterBill from '../screens/RegisterBill';
import { NavigationProp } from '@react-navigation/native';

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
        component={Home}
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
