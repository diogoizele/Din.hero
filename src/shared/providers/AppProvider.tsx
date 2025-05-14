import React, { ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import ThemeProvider from './ThemeProvider';
import { FormProvider, useForm } from 'react-hook-form';

type Props = {
  children: ReactNode;
};

function AppProvider({ children }: Props) {
  const methods = useForm();

  return (
    <GestureHandlerRootView>
      <ThemeProvider>
        <FormProvider {...methods}>
          <SafeAreaProvider>
            <NavigationContainer>{children}</NavigationContainer>
          </SafeAreaProvider>
        </FormProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default AppProvider;
