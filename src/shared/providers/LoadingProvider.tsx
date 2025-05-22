import { PropsWithChildren } from 'react';
import ActivityIndicator from '../../presentation/components/ActivirtIndicator';
import useApp from '../store/AppStore';
import { View } from 'react-native-ui-lib';
import { useTheme } from './ThemeProvider';
import { applyOpacity } from '../helpers/colors';
import { AbsoluteIndex } from '../constants/styles';

function LoadingProvider({ children }: PropsWithChildren) {
  const { isLoading } = useApp();
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
