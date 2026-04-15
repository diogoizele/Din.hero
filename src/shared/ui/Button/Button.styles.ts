import { StyleSheet, Platform } from 'react-native';

import type { ButtonColor, ButtonSize, ButtonVariant } from './Button.types';
import { Theme } from '../../theme/new_tokens';

export const MIN_TOUCH_TARGET = Platform.OS === 'ios' ? 44 : 48;

export const SIZE_CONFIG = {
  sm: {
    height: 32,
    px: 12,
    radius: 4,
    iconSize: 16,
    gap: 4,
    fontSize: 13,
    lineHeight: 18,
  },
  default: {
    height: 44,
    px: 16,
    radius: 4,
    iconSize: 20,
    gap: 6,
    fontSize: 15,
    lineHeight: 22,
  },
} satisfies Record<ButtonSize, any>;

type Params = {
  variant: ButtonVariant;
  color: ButtonColor;
  size: ButtonSize;
  disabled: boolean;
  fullWidth: boolean;
};

export const createStyles = (theme: Theme, params: Params) => {
  const size = SIZE_CONFIG[params.size];

  const isDarkMode = theme.mode === 'dark';

  const map = {
    primary: {
      base: theme.colors.brand,
      dark: theme.colors.brandHover,
      light: theme.colors.brandSubtle,
      on: '#FFFFFF',
    },
    success: {
      base: theme.colors.income,
      dark: theme.colors.incomePressed,
      light: theme.colors.incomeSubtle,
      on: isDarkMode ? '#0F1523' : '#FFFFFF',
    },
    danger: {
      base: theme.colors.expense,
      dark: theme.colors.expensePressed,
      light: theme.colors.expenseSubtle,
      on: '#FFFFFF',
    },
    warning: {
      base: theme.colors.warning,
      dark: theme.colors.warningPressed,
      light: theme.colors.warningSubtle,
      on: '#0F1523',
    },
  } as const;

  const color = map[params.color];

  let containerBg = 'transparent';
  let rippleColor = color.dark;
  let containerBorder = 'transparent';
  let containerBorderWidth = 0;
  let labelColor = color.base;

  if (params.variant === 'contained') {
    containerBg = color.base;
    labelColor = color.on;
  }

  if (params.variant === 'text') {
    rippleColor = 'transparent';
  }

  if (params.variant === 'outlined') {
    rippleColor = `${color.dark}`;
    containerBorder = color.base;
    containerBorderWidth = 1.5;
  }

  const disabledBg = theme.colors.backgroundDisabled;
  const disabledBorder = theme.colors.border;
  const disabledLabel = theme.colors.textDisabled;

  const staticStyles = StyleSheet.create({
    wrapper: {
      alignSelf: params.fullWidth ? 'stretch' : 'flex-start',
    },

    pressable: {
      backgroundColor: params.disabled ? disabledBg : containerBg,
      borderColor: params.disabled ? disabledBorder : containerBorder,
      borderWidth: containerBorderWidth,

      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',

      height: size.height,
      paddingHorizontal: size.px,
      borderRadius: size.radius,
      gap: size.gap,
    },

    contentRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: size.gap,
      minWidth: 0,
    },

    contentRowLoading: {
      opacity: 0.72,
    },

    label: {
      fontSize: size.fontSize,
      lineHeight: size.lineHeight,
      fontWeight: '600',
      letterSpacing: 0.15,
      includeFontPadding: false,
      textAlignVertical: 'center',
      flexShrink: 1,
      minWidth: 0,

      color: params.disabled ? disabledLabel : labelColor,
    },

    labelLoading: {
      opacity: 1,
    },

    loadingIndicator: {
      marginLeft: size.gap,
      flexShrink: 0,
    },
  });

  const ripple = {
    color: rippleColor,
    borderless: false,
    foreground: true,
  };

  const hitSlop =
    size.height < MIN_TOUCH_TARGET
      ? {
          top: (MIN_TOUCH_TARGET - size.height) / 2,
          bottom: (MIN_TOUCH_TARGET - size.height) / 2,
        }
      : undefined;

  return {
    ...staticStyles,
    ripple,
    hitSlop,
  };
};
