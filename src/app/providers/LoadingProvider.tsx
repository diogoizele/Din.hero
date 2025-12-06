import { PropsWithChildren } from 'react';
import { View } from 'react-native-ui-lib';

import ActivityIndicator from '@shared/components/ActivityIndicator';
import { useTheme } from '@shared/hooks/useTheme';
import { applyOpacity } from '@shared/helpers/colors';
import { AbsoluteIndex } from '@shared/helpers/styles';
import useAppStore from '@data/store/AppStore';

function LoadingProvider({ children }: PropsWithChildren) {
  const { isLoading } = useAppStore();
  const { colors } = useTheme();

  return (
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
  );
}

export default LoadingProvider;
