import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProp } from '@react-navigation/native';

import {
  PublicRoutes,
  PublicStackParamList,
} from './PublicStackNavigator.types';
import Login from '../../features/Login/LoginView';

export type NavigationProps = Omit<
  NavigationProp<PublicStackParamList>,
  'state'
>;

const StackNavigator = createNativeStackNavigator<PublicStackParamList>();

const defaultScreenOptions = {
  headerShown: false,
};

function PublicStackNavigator() {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name={PublicRoutes.LOGIN}
        options={defaultScreenOptions}
        component={Login}
      />
    </StackNavigator.Navigator>
  );
}

export default PublicStackNavigator;
