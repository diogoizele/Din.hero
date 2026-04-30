import React, { useLayoutEffect } from 'react';
import { SystemBars } from 'react-native-edge-to-edge';

import AppProviders from './providers/AppProviders';
import RootStackNavigator from './navigation/RootStackNavigator';
import { useColorScheme } from 'react-native';
import { useThemeStore } from './store/theme.store';

function App(): React.JSX.Element {
  const systemMode = useColorScheme();
  const setMode = useThemeStore(state => state.setMode);

  useLayoutEffect(() => {
    if (systemMode) {
      setMode(systemMode);
    }
  }, [systemMode]);

  return (
    <AppProviders>
      <SystemBars style="auto" />
      <RootStackNavigator />
    </AppProviders>
  );
}

export default App;
