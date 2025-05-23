import React from 'react';

import AppProvider from './src/shared/providers/AppProvider';
import RootStackNavigator from './src/presentation/routes/RootStackNavigator';
import { StatusBar } from 'react-native';

function App(): React.JSX.Element {
  return (
    <AppProvider>
      <StatusBar barStyle="dark-content" />
      <RootStackNavigator />
    </AppProvider>
  );
}

export default App;
