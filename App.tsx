import React from 'react';
import { StatusBar } from 'react-native';

import AppProviders from './src/app/providers/AppProviders';
import RootStackNavigator from './src/app/navigation/RootStackNavigator';

function App(): React.JSX.Element {
  return (
    <AppProviders>
      <StatusBar barStyle="dark-content" />
      <RootStackNavigator />
    </AppProviders>
  );
}

export default App;
