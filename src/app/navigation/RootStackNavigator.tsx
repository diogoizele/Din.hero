import { createStackNavigator } from '@core';

import { AuthGate } from './AuthGate';

const StackNavigator = createStackNavigator();

export const screenOptions = {
  headerShown: false,
};

function RootStackNavigator() {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name="Root"
        options={screenOptions}
        component={AuthGate}
      />
    </StackNavigator.Navigator>
  );
}

export default RootStackNavigator;
