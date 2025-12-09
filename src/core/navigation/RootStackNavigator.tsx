import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootRoutes, RootStackParamList } from './RootStackNavigator.types';
import PrivateStackNavigator from './PrivateStackNavigator';
import PublicStackNavigator from './PublicStackNavigator';

const StackNavigator = createNativeStackNavigator<RootStackParamList>();

export const defaultScreenOptions = {
  headerShown: false,
};

function RootStackNavigator() {
  const { authenticated } = {
    authenticated: false,
  };

  return (
    <StackNavigator.Navigator>
      {authenticated ? (
        <StackNavigator.Screen
          name={RootRoutes.PRIVATE}
          options={defaultScreenOptions}
          component={PrivateStackNavigator}
        />
      ) : (
        <StackNavigator.Screen
          name={RootRoutes.PUBLIC}
          options={defaultScreenOptions}
          component={PublicStackNavigator}
        />
      )}
    </StackNavigator.Navigator>
  );
}

export default RootStackNavigator;
