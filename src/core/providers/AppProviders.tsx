import React, { ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FormProvider, useForm } from 'react-hook-form';
import { Provider } from 'react-redux';
import { PortalHost, PortalProvider } from '@gorhom/portal';

import { store } from '@core/config/redux/store';

import ThemeProvider from './ThemeProvider';
import LoadingProvider from './LoadingProvider';
import FirebaseListenerProvider from './FirebaseListenerProvider';
import BottomSheetProvider from './BottomSheetProvider';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

type Props = {
  children: ReactNode;
};

function AppProviders({ children }: Props) {
  const methods = useForm();

  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <ThemeProvider>
          <LoadingProvider>
            <BottomSheetProvider>
              <BottomSheetModalProvider>
                <FormProvider {...methods}>
                  <FirebaseListenerProvider>
                    <SafeAreaProvider>
                      <NavigationContainer>{children}</NavigationContainer>
                    </SafeAreaProvider>
                  </FirebaseListenerProvider>
                </FormProvider>
              </BottomSheetModalProvider>
            </BottomSheetProvider>
          </LoadingProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default AppProviders;
