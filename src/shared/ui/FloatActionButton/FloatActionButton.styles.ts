import { Platform, StyleSheet } from 'react-native';

import { Theme } from '@shared/theme';
import { ButtonSize } from '@shared/ui/Button';

import { FloatActionButtonProps } from './FloatActionButton';

type StyleParams = Required<
  Pick<FloatActionButtonProps, 'color' | 'size' | 'disabled'>
>;

export const MIN_TOUCH_TARGET = Platform.OS === 'ios' ? 44 : 48;

export const SIZE_CONFIG = {
  sm: {
    height: 32,
    width: 32,
    radius: 10,
    iconSize: 16,
  },
  default: {
    height: 64,
    width: 64,
    radius: 32,
    iconSize: 32,
  },
} satisfies Record<ButtonSize, any>;

export const createStyles = (theme: Theme, params: StyleParams) => {
  const size = SIZE_CONFIG[params.size];
  const isDarkMode = theme.mode === 'dark';

  const map = {
    primary: {
      base: theme.colors.brand,
      dark: theme.colors.brandPressed,
      light: theme.colors.brandSubtle,
      on: theme.colors.white,
    },
    success: {
      base: theme.colors.success,
      dark: theme.colors.successPressed,
      light: theme.colors.successSubtle,
      on: isDarkMode ? theme.colors.textPrimary : theme.colors.white,
    },
    danger: {
      base: theme.colors.danger,
      dark: theme.colors.dangerPressed,
      light: theme.colors.dangerSubtle,
      on: theme.colors.white,
    },
    warning: {
      base: theme.colors.warning,
      dark: theme.colors.warningPressed,
      light: theme.colors.warningSubtle,
      on: theme.colors.textPrimary,
    },
  } as const;

  const color = map[params.color];

  const staticStyles = StyleSheet.create({
    wrapper: {
      position: 'absolute',
      bottom: 36,
      right: 24,
    },

    pressable: {
      width: size.width,
      height: size.height,
      borderRadius: size.radius,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',

      backgroundColor: params.disabled
        ? theme.colors.backgroundDisabled
        : color.base,

      borderWidth: 1,
      borderColor: params.disabled ? theme.colors.border : 'transparent',

      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: params.disabled ? 0 : isDarkMode ? 0.24 : 0.18,
      shadowRadius: 14,
      elevation: params.disabled ? 0 : 8,
    },
  });

  const ripple = {
    color: params.disabled ? theme.colors.border : color.dark,
    borderless: false,
    foreground: true,
  };

  const icon = {
    color: params.disabled ? theme.colors.textDisabled : color.on,
    size: size.iconSize,
  };

  const hitSlop =
    size.height < MIN_TOUCH_TARGET
      ? {
        top: (MIN_TOUCH_TARGET - size.height) / 2,
        bottom: (MIN_TOUCH_TARGET - size.height) / 2,
        left: (MIN_TOUCH_TARGET - size.width) / 2,
        right: (MIN_TOUCH_TARGET - size.width) / 2,
      }
      : undefined;

  return {
    ...staticStyles,
    icon,
    ripple,
    hitSlop,
  };
};
