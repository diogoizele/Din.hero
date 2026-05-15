import React, { memo, useMemo } from 'react';
import { Pressable, Text, View, GestureResponderEvent } from 'react-native';

import { useStyled } from '@shared/hooks';
import { Icon } from '@shared/ui';
import { IconName } from '@shared/ui/Icon';

import { createStyles } from './Badge.styles';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger';
type BadgeIconStyle = 'filled' | 'outlined';

export interface BadgeProps {
  variant?: BadgeVariant;
  text: string;
  icon?: IconName;
  iconStyle?: BadgeIconStyle;
  onPress?: (event: GestureResponderEvent) => void;
}

const DEFAULT_ICONS: Record<BadgeIconStyle, Record<BadgeVariant, IconName>> = {
  filled: {
    default: 'circle-info',
    success: 'circle-check',
    warning: 'circle-exclamation',
    danger: 'circle-xmark',
  },
  outlined: {
    default: 'info',
    success: 'check',
    warning: 'exclamation',
    danger: 'xmark',
  },
};

function BadgeComponent({
  variant = 'default',
  text,
  icon,
  iconStyle = 'filled',
  onPress,
}: BadgeProps) {
  const [styles] = useStyled(theme => createStyles(theme, variant));
  const isOutlined = iconStyle === 'outlined';

  const resolvedIcon = useMemo(
    () => icon ?? DEFAULT_ICONS[iconStyle][variant],
    [icon, variant, iconStyle],
  );

  const content = (
    <View style={styles.container}>
      <View style={[isOutlined && styles.iconContainer]}>
        <Icon
          name={resolvedIcon}
          size={isOutlined ? 8 : 14}
          color={styles.icon.color}
        />
      </View>

      <Text numberOfLines={1} style={styles.text}>
        {text}
      </Text>
    </View>
  );

  if (!onPress) {
    return content;
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}>
      {content}
    </Pressable>
  );
}

export const Badge = memo(BadgeComponent);
