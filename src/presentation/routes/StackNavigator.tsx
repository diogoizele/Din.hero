import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';

const StackNavigator = createNativeStackNavigator();

function RootStackNavigator() {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name="Home"
        options={{
          headerShown: false,
        }}
        component={Home}
      />
      <StackNavigator.Screen
        name="Details"
        component={() => <Text>Details</Text>}
      />
    </StackNavigator.Navigator>
  );
}

export default RootStackNavigator;
