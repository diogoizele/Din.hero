import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import HapticFeedback from 'react-native-haptic-feedback';

import { useAnimations } from './useAnimations';
import type { ButtonProps } from './Button.types';
import { useStyled } from '../../hooks';
import { createStyles } from './Button.styles';

const triggerHaptic = () => {
  HapticFeedback.trigger('impactLight', {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  });
};

export const Button = ({
  label,
  onPress,
  onLongPress,
  variant = 'contained',
  size = 'default',
  color = 'primary',
  fullWidth = false,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  accessibilityLabel,
  accessibilityHint,
  haptic = true,
  style,
  labelStyle,
  testID,
}: ButtonProps) => {
  const isInteractive = !disabled && !loading;
  const isLoading = loading;

  const styles = useStyled(theme =>
    createStyles(theme, { color, disabled, fullWidth, size, variant }),
  );

  const { animatedStyle, onPressIn, onPressOut } = useAnimations(
    !isInteractive,
  );

  const handlePress = () => {
    if (!isInteractive) {
      return;
    }

    if (haptic) {
      triggerHaptic();
    }

    onPress();
  };

  return (
    <Animated.View style={[styles.wrapper, animatedStyle, style]}>
      <Pressable
        onPress={handlePress}
        onLongPress={onLongPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        disabled={!isInteractive}
        android_ripple={styles.ripple}
        hitSlop={styles.hitSlop}
        testID={testID}
        accessible
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityHint={accessibilityHint}
        accessibilityState={{
          disabled,
          busy: loading,
        }}
        style={styles.pressable}>
        <View
          style={[styles.contentRow, isLoading && styles.contentRowLoading]}>
          {!isLoading && leftIcon}

          <Text
            style={[styles.label, isLoading && styles.labelLoading, labelStyle]}
            numberOfLines={1}
            allowFontScaling={false}>
            {label}
          </Text>

          {isLoading ? (
            <View style={styles.loadingIndicator}>
              <ActivityIndicator size="small" color={styles.label.color} />
            </View>
          ) : (
            rightIcon
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
};
