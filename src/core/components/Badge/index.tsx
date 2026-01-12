import { Pressable } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { MarginModifiers, PaddingModifiers, View } from 'react-native-ui-lib';

import { useTheme } from '../../hooks';
import Icon, { IconName } from '../Icon';

interface Props extends PaddingModifiers, MarginModifiers {
  text: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'large';
  bold?: boolean;
  icon?: IconName;

  onPress?: () => void;
}

export function Badge({
  text,
  variant = 'default',
  size = 'medium',
  bold,
  icon,
  onPress,
  ...modifiers
}: Props) {
  const { colors } = useTheme();

  const backgroundColor = {
    default: colors.$backgroundNeutralLight,
    primary: colors.primary,
    success: colors.green70,
    warning: colors.yellow60,
    error: colors.red60,
  }[variant];

  const textColor = {
    default: colors.textSecondary,
    primary: colors.white,
    success: colors.green10,
    warning: colors.yellow10,
    error: colors.red20,
  }[variant];

  const paddingVertical = {
    small: 2,
    medium: 4,
    large: 6,
  }[size];

  const paddingHorizontal = {
    small: 6,
    medium: 8,
    large: 10,
  }[size];

  const fontSize = {
    small: 10,
    medium: 12,
    large: 14,
  }[size];

  return (
    <Pressable onPress={onPress} disabled={!onPress}>
      <View
        {...modifiers}
        row
        gap-6
        style={{
          backgroundColor,
          paddingVertical,
          paddingHorizontal,
          borderRadius: 32,
          alignSelf: 'flex-start',
        }}>
        {icon && <Icon name={icon} size={fontSize} color={textColor} />}
        <Text
          style={{
            color: textColor,
            fontSize,
            fontWeight: bold ? 'bold' : 'normal',
          }}>
          {text}
        </Text>
      </View>
    </Pressable>
  );
}
