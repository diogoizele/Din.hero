import { useEffect } from 'react';

import {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const SWEEP_DURATION = 1100;
const PULSE_DURATION = 700;

export function useAnimations(
  isLoading: boolean,
  containerWidth: number,
) {
  const reducedMotion = useReducedMotion();

  const progress = useSharedValue(0);

  const highlightWidth = containerWidth * 0.45;

  /**
   * Start/stop animation
   */
  useEffect(() => {
    cancelAnimation(progress);

    if (!isLoading || containerWidth <= 0) {
      progress.value = 0;
      return;
    }

    if (reducedMotion) {
      progress.value = withRepeat(
        withSequence(
          withTiming(0.4, {
            duration: PULSE_DURATION,
          }),
          withTiming(1, {
            duration: PULSE_DURATION,
          }),
        ),
        -1,
        false,
      );

      return;
    }

    progress.value = 0;

    progress.value = withRepeat(
      withTiming(1, {
        duration: SWEEP_DURATION,
        easing: Easing.linear,
      }),
      -1,
      false,
    );

    return () => {
      cancelAnimation(progress);
    };
  }, [containerWidth, isLoading, reducedMotion]);


  const translateX = useDerivedValue(() => {
    const start = -highlightWidth;
    const end = containerWidth + highlightWidth;

    return start + (end - start) * progress.value;
  });

  const contentStyle = useAnimatedStyle(() => ({
    opacity: isLoading ? 0 : 1,
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: isLoading ? 1 : 0,
  }));

  const sweepStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],

      opacity: reducedMotion
        ? progress.value
        : 1,
    };
  });

  return {
    contentStyle,
    overlayStyle,
    sweepStyle,
    highlightWidth,
  };
}
