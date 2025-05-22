import { ActivityIndicator as RNActivityIndicator } from 'react-native';
import { useTheme } from '../../../shared/providers/ThemeProvider';

export type LoaderProps = {
  isLoading?: boolean;
  size?: 'small' | 'large' | number;
  color?: 'primary' | 'secondary' | 'white';
};

function ActivityIndicator({
  isLoading = false,
  size,
  color = 'primary',
}: LoaderProps) {
  const { colors } = useTheme();

  if (!isLoading) {
    return null;
  }

  return <RNActivityIndicator size={size} color={colors[color]} />;
}

export default ActivityIndicator;
