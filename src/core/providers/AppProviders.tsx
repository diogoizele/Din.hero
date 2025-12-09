import React, { ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FormProvider, useForm } from 'react-hook-form';
import { Provider } from 'react-redux';

import { store } from '@core/config/redux/store';

import ThemeProvider from './ThemeProvider';
import LoadingProvider from './LoadingProvider';
import FirebaseListenerProvider from './FirebaseListenerProvider';

type Props = {
  children: ReactNode;
};

function AppProviders({ children }: Props) {
  const methods = useForm();

  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <ThemeProvider>
          <FormProvider {...methods}>
            <FirebaseListenerProvider>
              <LoadingProvider>
                <SafeAreaProvider>
                  <NavigationContainer>{children}</NavigationContainer>
                </SafeAreaProvider>
              </LoadingProvider>
            </FirebaseListenerProvider>
          </FormProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default AppProviders;
