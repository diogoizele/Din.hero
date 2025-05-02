import React from 'react';

import AppProvider from './src/providers/AppProvider';
import RootStackNavigator from './src/routes/StackNavigator';

function App(): React.JSX.Element {
  return (
    <AppProvider>
      <RootStackNavigator />
    </AppProvider>
  );
}

export default App;
