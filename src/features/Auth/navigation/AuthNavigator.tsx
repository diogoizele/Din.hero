import { useMemo } from 'react';
import { SystemBars } from 'react-native-edge-to-edge';

import { useTheme } from '@shared/hooks';
import { createStackNavigator } from '@core';

import { AuthParamsList, AuthRoutes } from './AuthNavigator.types';
import { FirstAccess, Login, Signup } from '../screens';

const Stack = createStackNavigator<AuthParamsList>();

export default function AuthNavigator() {
  const { colors, mode } = useTheme();

  const screenOptions = {
    title: '',
    headerStyle: {
      backgroundColor: colors.brand,
    },
    headerTintColor: colors.white,
    headerShadowVisible: false,
  };

  const systemBarsStyle = useMemo(() => {
    if (mode === 'dark') {
      return {
        navigationBar: 'light',
        statusBar: 'light',
      } as const;
    }

    return { navigationBar: 'dark', statusBar: 'light' } as const;
  }, [mode]);

  return (
    <>
      <SystemBars style={systemBarsStyle} />
      <Stack.Navigator
        screenOptions={screenOptions}
        initialRouteName={AuthRoutes.FIRST_ACCESS}>
        <Stack.Screen name={AuthRoutes.FIRST_ACCESS} component={FirstAccess} />
        <Stack.Screen name={AuthRoutes.LOGIN} component={Login} />
        <Stack.Screen name={AuthRoutes.SIGNUP} component={Signup} />
      </Stack.Navigator>
    </>
  );
}
