import { useCallback } from 'react';
import { Platform } from 'react-native';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useReducedMotion,
} from 'react-native-reanimated';

const PRESS_OUT_SPRING = { damping: 14, stiffness: 300, mass: 0.6 };
const OPACITY_IN = { duration: 0 };
const OPACITY_OUT = { duration: 300 };

const SCALE_PRESSED = 0.96;
const OPACITY_PRESSED = Platform.OS === 'ios' ? 0.9 : 1;

export function useAnimations(disabled: boolean) {
  const reducedMotion = useReducedMotion();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const onPressIn = useCallback(() => {
    if (disabled || reducedMotion) {
      return;
    }

    scale.value = SCALE_PRESSED;
    opacity.value = withTiming(OPACITY_PRESSED, OPACITY_IN);
  }, [disabled, reducedMotion, opacity, scale]);

  const onPressOut = useCallback(() => {
    if (disabled || reducedMotion) {
      return;
    }

    scale.value = withSpring(1, PRESS_OUT_SPRING);
    opacity.value = withTiming(1, {
      duration: OPACITY_OUT.duration,
    });
  }, [disabled, reducedMotion, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return { animatedStyle, onPressIn, onPressOut };
}
