import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle, TextStyle } from 'react-native';

export type ButtonVariant = 'contained' | 'outlined' | 'text';
export type ButtonSize = 'sm' | 'default';
export type ButtonColor = 'primary' | 'warning' | 'danger' | 'success';

export interface ButtonProps {
  label: string;
  onPress: () => void;
  onLongPress?: () => void;

  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  fullWidth?: boolean;

  disabled?: boolean;
  loading?: boolean;

  leftIcon?: ReactNode;
  rightIcon?: ReactNode;

  accessibilityLabel?: string;
  accessibilityHint?: string;

  haptic?: boolean;

  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;

  testID?: string;
}
