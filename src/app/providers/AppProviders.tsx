import React, { ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FormProvider, useForm } from 'react-hook-form';
import { Provider } from 'react-redux';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClientProvider } from '@tanstack/react-query';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { store } from '@core/config/redux/store';
import { queryClient } from '@core/api';

import ThemeProvider from './ThemeProvider';
import LoadingProvider from './LoadingProvider';
import FirebaseListenerProvider from './FirebaseListenerProvider';
import BottomSheetProvider from './BottomSheetProvider';

type Props = {
  children: ReactNode;
};

function AppProviders({ children }: Props) {
  const methods = useForm();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView>
          <ThemeProvider>
            <LoadingProvider>
              <BottomSheetProvider>
                <BottomSheetModalProvider>
                  <FormProvider {...methods}>
                    <FirebaseListenerProvider>
                      <KeyboardProvider>
                        <SafeAreaProvider>
                          <NavigationContainer>{children}</NavigationContainer>
                        </SafeAreaProvider>
                      </KeyboardProvider>
                    </FirebaseListenerProvider>
                  </FormProvider>
                </BottomSheetModalProvider>
              </BottomSheetProvider>
            </LoadingProvider>
          </ThemeProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </Provider>
  );
}

export default AppProviders;
