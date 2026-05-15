import { StyleSheet } from 'react-native';

import { Theme } from '@shared/theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing(1.5),
      paddingVertical: theme.spacing(1.5),
      backgroundColor: theme.colors.surface,
      height: 72,
    },

    iconWrapper: {
      width: 44,
      height: 44,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
      flexShrink: 0,
      backgroundColor: theme.colors.brandSubtle,
    },

    textContainer: {
      flex: 1,
      gap: 2,
    },

    description: {
      fontSize: 15,
      fontWeight: '500',
      color: theme.colors.textPrimary,
    },

    amountContainer: {
      flexShrink: 0,
    },

    amount: {
      fontSize: 13,
      color: theme.colors.textSecondary,
    },

    rightActionContainer: {
      backgroundColor: theme.colors.brand,
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingHorizontal: theme.spacing(2),
    },

    rightActionText: {
      width: 100,
      textAlign: 'right',
    },

    divider: {
      marginHorizontal: theme.spacing(3),
      height: StyleSheet.hairlineWidth,
      backgroundColor: theme.colors.border,
    },
  });
