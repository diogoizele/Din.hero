import { PropsWithChildren } from 'react';
import { View } from 'react-native-ui-lib';

import ActivityIndicator from '../components/ActivityIndicator';
import useAppStore from '../store/AppStore';
import { useTheme } from '../hooks/useTheme';
import { applyOpacity } from '../helpers/colors';
import { AbsoluteIndex } from '../constants/styles';

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
