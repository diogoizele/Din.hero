import { StyleSheet } from 'react-native';

import { Theme } from '@shared/theme';
import { ProgressBarProps } from './ProgressBar.types';

export const createStyles = (theme: Theme, params: Required<Pick<ProgressBarProps, 'variant'>>) => {

  const map = {
    default: theme.colors.brand,
    success: theme.colors.success,
    warning: theme.colors.warning,
    danger: theme.colors.danger,
  };


  return StyleSheet.create({
    bar: {
      width: '100%',
      height: 6,
      borderRadius: 4,
      backgroundColor: theme.colors.border,
    },
    progress: {
      height: '100%',
      backgroundColor: map[params.variant],
      borderRadius: 4,
    },
  });
};
