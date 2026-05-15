import { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { Icon } from '@shared/components';
import { Theme } from '@shared/theme';
import { useStyled } from '@shared/hooks';
import { AppError } from '@core/api';

type ErrorProps = {
  error: AppError | null;
  colors: Theme['colors'];
};

export const ErrorBanner = memo(({ error, colors }: ErrorProps) => {
  const [styles] = useStyled(createStyles);

  if (!error) {
    return null;
  }

  return (
    <Animated.View
      style={styles.errorContainer}
      entering={FadeIn.duration(300)}>
      <Icon name="close" color={colors.surface} size={20} />
      <Text style={styles.error}>{error.userMessage}</Text>
    </Animated.View>
  );
});

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    errorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing(0.75),
      backgroundColor: theme.colors.danger,
      paddingVertical: theme.spacing(1),
      paddingHorizontal: theme.spacing(2),
      borderRadius: theme.spacing(0.5),
    },
    error: {
      fontSize: 13,
      fontWeight: '500',
      color: theme.colors.surface,
      flexShrink: 1,
      lineHeight: 18,
    },
  });
