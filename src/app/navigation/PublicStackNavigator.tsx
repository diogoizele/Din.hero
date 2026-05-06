import { NavigationProp } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';

import { createStackNavigator } from '@core';
import { AuthNavigator } from '@features/Auth';
import { TermsNavigator } from '@features/Terms';

import {
  PublicRoutes,
  PublicStackParamList,
} from './PublicStackNavigator.types';
import { useTheme } from '../../shared/hooks';

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
  const { colors } = useTheme();

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
          headerTintColor: colors.brand,
          headerBackButtonDisplayMode: 'minimal',
        }}
        component={TermsNavigator}
      />
    </Stack.Navigator>
  );
}

export default PublicStackNavigator;
