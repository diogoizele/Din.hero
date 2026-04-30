import { NavigationProp } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';

import { createStackNavigator } from '@core';
import { AuthNavigator } from '@features/Auth';
import { TermsNavigator } from '@features/Terms';

import {
  PublicRoutes,
  PublicStackParamList,
} from './PublicStackNavigator.types';

export type NavigationProps = Omit<
  NavigationProp<PublicStackParamList>,
  'state'
>;

const Stack = createStackNavigator<PublicStackParamList>();

const screenOptions = {
  headerShown: false,
  gestureEnabled: false,
  animation: 'none',
} as StackNavigationOptions;

function PublicStackNavigator() {
  return (
    <Stack.Navigator initialRouteName={PublicRoutes.AUTH}>
      <Stack.Screen
        name={PublicRoutes.AUTH}
        options={screenOptions}
        component={AuthNavigator}
      />
      <Stack.Screen
        name={PublicRoutes.TERMS}
        options={{
          title: 'Política de Privacidade',
          headerShadowVisible: false,
        }}
        component={TermsNavigator}
      />
    </Stack.Navigator>
  );
}

export default PublicStackNavigator;
