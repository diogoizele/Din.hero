import React, { ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ThemeProvider } from './ThemeProvider';

type Props = {
  children: ReactNode;
};

function AppProvider({ children }: Props) {
  return (
    <GestureHandlerRootView>
      <ThemeProvider>
        <SafeAreaProvider>
          <NavigationContainer>{children}</NavigationContainer>
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default AppProvider;
