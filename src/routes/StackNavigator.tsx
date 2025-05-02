import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../ui/screens/Home';
import { Text } from 'react-native';

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
