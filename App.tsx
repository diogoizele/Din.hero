import React from 'react';
import { StatusBar } from 'react-native';

import AppProviders from './src/core/providers/AppProviders';
import RootStackNavigator from './src/core/navigation/RootStackNavigator';

function App(): React.JSX.Element {
  return (
    <AppProviders>
      <StatusBar barStyle="dark-content" />
      <RootStackNavigator />
    </AppProviders>
  );
}

export default App;
