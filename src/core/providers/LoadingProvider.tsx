import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { View } from 'react-native-ui-lib';

import ActivityIndicator from '@core/components/ActivityIndicator';
import { useTheme } from '@core/hooks/useTheme';
import { applyOpacity } from '@core/helpers/colors';
import { AbsoluteIndex } from '@core/theme/styles';

type LoadingContextType = {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType>(
  {} as LoadingContextType,
);

function LoadingProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(false);
  const { colors } = useTheme();

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setIsLoading,
      }}>
      <View flex>
        {isLoading && (
          <View
            absF
            center
            backgroundColor={applyOpacity(colors.background, 0.5)}
            style={AbsoluteIndex}>
            <ActivityIndicator isLoading={isLoading} size="large" />
          </View>
        )}
        {children}
      </View>
    </LoadingContext.Provider>
  );
}

export const useLoading = () => {
  if (!LoadingContext) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return useContext(LoadingContext);
};

export default LoadingProvider;
