import React from 'react';
import { StatusBar } from 'react-native';

import AppProviders from './providers/AppProviders';
import RootStackNavigator from './navigation/RootStackNavigator';

function App(): React.JSX.Element {
  return (
    <AppProviders>
      <StatusBar barStyle="dark-content" />
      <RootStackNavigator />
    </AppProviders>
  );
}

export default App;
