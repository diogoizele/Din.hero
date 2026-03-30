import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { NavigationProp } from '@react-navigation/native';

import { FirstAccess, Login, SignUp } from '@features/Auth';

import {
  PublicRoutes,
  PublicStackParamList,
} from './PublicStackNavigator.types';

export type NavigationProps = Omit<
  NavigationProp<PublicStackParamList>,
  'state'
>;

const StackNavigator = createNativeStackNavigator<PublicStackParamList>();

const defaultScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  gestureEnabled: false,
  animation: 'none',
};

function PublicStackNavigator() {
  return (
    <StackNavigator.Navigator initialRouteName={PublicRoutes.FIRST_ACCESS}>
      <StackNavigator.Screen
        name={PublicRoutes.FIRST_ACCESS}
        options={defaultScreenOptions}
        component={FirstAccess}
      />
      <StackNavigator.Screen
        name={PublicRoutes.LOGIN}
        options={defaultScreenOptions}
        component={Login}
      />
      <StackNavigator.Screen
        name={PublicRoutes.SIGNUP}
        options={defaultScreenOptions}
        component={SignUp}
      />
    </StackNavigator.Navigator>
  );
}

export default PublicStackNavigator;
