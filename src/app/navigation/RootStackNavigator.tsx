import { createStackNavigator } from '@core';
import { useAuthStore } from '@features/Auth';

import { AppStackNavigator } from './AppStackNavigator';
import PublicStackNavigator from './PublicStackNavigator';

const StackNavigator = createStackNavigator();

export const screenOptions = {
  headerShown: false,
};

function RootStackNavigator() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <StackNavigator.Navigator>
      {isAuthenticated ? (
        <StackNavigator.Screen
          name="App"
          options={screenOptions}
          component={AppStackNavigator}
        />
      ) : (
        <StackNavigator.Screen
          name="Public"
          options={screenOptions}
          component={PublicStackNavigator}
        />
      )}
    </StackNavigator.Navigator>
  );
}

export default RootStackNavigator;
