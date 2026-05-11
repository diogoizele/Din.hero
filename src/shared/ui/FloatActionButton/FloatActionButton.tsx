import React, { memo } from 'react';
import { Pressable } from 'react-native-gesture-handler';
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

  onPress: () => void;

  size?: ButtonSize;
  color?: ButtonColor;
  disabled?: boolean;
}

const triggerHaptic = () => {
  HapticFeedback.trigger('impactLight', {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  });
};

const FABComponent = ({
  icon,
  color = 'primary',
  size = 'default',
  disabled = false,
  onPress,
}: FloatActionButtonProps) => {
  const isInteractive = !disabled;

  const [styles] = useStyled(theme =>
    createStyles(theme, {
      color,
      size,
      disabled,
    }),
  );

  const { animatedStyle, onPressIn, onPressOut } = useAnimations(
    !isInteractive,
  );

  const handlePress = () => {
    if (!isInteractive) {
      return;
    }

    triggerHaptic();
    onPress();
  };

  return (
    <Animated.View style={[styles.wrapper, animatedStyle]}>
      <Pressable
        onPress={handlePress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
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
