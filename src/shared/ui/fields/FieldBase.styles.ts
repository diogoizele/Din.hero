
import { StyleSheet } from 'react-native';


import { Theme } from '@shared/theme/new_tokens';

export const createFieldBaseStyles = (theme: Theme) =>
  StyleSheet.create({
    label: {
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing(0.5),
    },
    labelDisabled: {
      color: theme.colors.textDisabled,
    },
    box: {
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: theme.spacing(0.5),
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
    },
    boxDisabled: {
      backgroundColor: theme.colors.backgroundDisabled,
      opacity: 0.9,
    },
  });
