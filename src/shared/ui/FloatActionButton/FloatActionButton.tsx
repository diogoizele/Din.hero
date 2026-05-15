import React, { memo } from 'react';
import { Pressable } from 'react-native-gesture-handler';
import { PressableEvent } from 'react-native-gesture-handler/lib/typescript/components/Pressable/PressableProps';
import Animated from 'react-native-reanimated';
import HapticFeedback from 'react-native-haptic-feedback';

import { useStyled } from '@shared/hooks';
import { Icon } from '@shared/ui';
import { icons } from '@shared/ui/Icon';
import { ButtonColor, ButtonSize } from '@shared/ui/Button';

import { useAnimations } from './useAnimations';
import { createStyles } from './FloatActionButton.styles';

export interface FloatActionButtonProps {
  icon: keyof typeof icons;

  onPress: (event?: PressableEvent) => void;
  onLongPress?: (event?: PressableEvent) => void;

  type?: 'circular' | 'rounded';
  size?: ButtonSize;
  color?: ButtonColor;
  disabled?: boolean;
}

const triggerHaptic = (options?: { ignoreAndroidSystemSettings: boolean }) => {
  HapticFeedback.trigger('impactLight', {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: options?.ignoreAndroidSystemSettings ?? false,
  });
};

const FABComponent = ({
  icon,
  color = 'primary',
  size = 'default',
  disabled = false,
  type = 'circular',
  onPress,
  onLongPress,
}: FloatActionButtonProps) => {
  const isInteractive = !disabled;

  const [styles] = useStyled(theme =>
    createStyles(theme, {
      color,
      size,
      disabled,
      type,
    }),
  );

  const { animatedStyle, onPressIn, onPressOut } = useAnimations(
    !isInteractive,
  );

  const handlePress = (event: PressableEvent) => {
    if (!isInteractive) {
      return;
    }

    triggerHaptic();
    onPress(event);
  };

  const handleLongPress = (event: PressableEvent) => {
    if (!isInteractive) {
      return;
    }

    triggerHaptic({ ignoreAndroidSystemSettings: true });
    onLongPress?.(event);
  };

  return (
    <Animated.View style={[styles.wrapper, animatedStyle]}>
      <Pressable
        onPress={handlePress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onLongPress={handleLongPress}
        disabled={!isInteractive}
        android_ripple={styles.ripple}
        hitSlop={styles.hitSlop}
        accessible
        accessibilityRole="button"
        accessibilityLabel={icon}
        accessibilityState={{
          disabled,
        }}
        style={styles.pressable}>
        <Icon name={icon} color={styles.icon.color} size={styles.icon.size} />
      </Pressable>
    </Animated.View>
  );
};

export const FloatActionButton = memo(FABComponent);

export default FloatActionButton;
