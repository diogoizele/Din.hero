import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { isLoggedInSelector } from '@features/Auth/stores/auth.selectors';

import { RootRoutes, RootStackParamList } from './RootStackNavigator.types';
import PrivateStackNavigator from './PrivateStackNavigator';
import PublicStackNavigator from './PublicStackNavigator';
import { useAppSelector } from '../hooks';

const StackNavigator = createNativeStackNavigator<RootStackParamList>();

export const defaultScreenOptions = {
  headerShown: false,
};

function RootStackNavigator() {
  const authenticated = useAppSelector(isLoggedInSelector);

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
