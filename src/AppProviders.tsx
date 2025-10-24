import React, { ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FormProvider, useForm } from 'react-hook-form';

import ThemeProvider from './theme/ThemeProvider';
import LoadingProvider from './providers/LoadingProvider';

type Props = {
  children: ReactNode;
};

function AppProviders({ children }: Props) {
  const methods = useForm();

  return (
    <GestureHandlerRootView>
      <ThemeProvider>
        <FormProvider {...methods}>
          <LoadingProvider>
            <SafeAreaProvider>
              <NavigationContainer>{children}</NavigationContainer>
            </SafeAreaProvider>
          </LoadingProvider>
        </FormProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default AppProviders;
