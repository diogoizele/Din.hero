import { ActivityIndicator as RNActivityIndicator } from 'react-native';

import { useTheme } from '@shared/hooks';

export type LoaderProps = {
  isLoading?: boolean;
  size?: 'small' | 'large' | number;
  color?: string;
};

function ActivityIndicator({ isLoading = false, size, color }: LoaderProps) {
  const { colors } = useTheme();

  if (!isLoading) {
    return null;
  }

  return <RNActivityIndicator size={size} color={color ?? colors.white} />;
}

export default ActivityIndicator;
