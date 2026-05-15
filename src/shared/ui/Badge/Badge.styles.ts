import { StyleSheet } from 'react-native';

import { Theme } from '@shared/theme';

import { BadgeVariant } from './Badge';

const variantMap: Record<
  BadgeVariant,
  {
    backgroundColorKey: keyof Theme['colors'];
    textColorKey: keyof Theme['colors'];
    borderColorKey: keyof Theme['colors'];
  }
> = {
  default: {
    backgroundColorKey: 'brandSubtle',
    textColorKey: 'brand',
    borderColorKey: 'brandSubtle',
  },
  success: {
    backgroundColorKey: 'successSubtle',
    textColorKey: 'success',
    borderColorKey: 'successSubtle',
  },
  warning: {
    backgroundColorKey: 'warningSubtle',
    textColorKey: 'warning',
    borderColorKey: 'warningSubtle',
  },
  danger: {
    backgroundColorKey: 'dangerSubtle',
    textColorKey: 'danger',
    borderColorKey: 'dangerSubtle',
  },
};

export const createStyles = (
  theme: Theme,
  variant: BadgeVariant,
) => {
  const config = variantMap[variant];

  const backgroundColor =
    theme.colors[config.backgroundColorKey];

  const color =
    theme.colors[config.textColorKey];

  const borderColor =
    theme.colors[config.borderColorKey];

  return StyleSheet.create({
    pressable: {
      alignSelf: 'flex-start',
      borderRadius: 999,
    },

    pressed: {
      opacity: 0.72,
    },

    container: {
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',

      paddingHorizontal: theme.spacing(1),
      paddingVertical: theme.spacing(0.5),

      gap: theme.spacing(0.5),

      borderRadius: 999,
      borderWidth: 1,

      backgroundColor,
      borderColor,

      minHeight: 28,
    },

    iconContainer: {
      width: 14,
      height: 14,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: color,
      borderWidth: 1,
    },

    icon: {
      color,
    },

    text: {
      color,
      fontSize: 12,
      fontWeight: '600',
      includeFontPadding: false,
    },

  });
};
