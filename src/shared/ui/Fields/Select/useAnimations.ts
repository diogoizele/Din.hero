// useAnimations.ts
import { useCallback } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

import { useNewTheme } from '@shared/hooks';

export const useAnimations = () => {
  const theme = useNewTheme();

  const borderColor = useSharedValue(theme.colors.border);
  const boxShadowWidth = useSharedValue(0);
  const chevronProgress = useSharedValue(0);
  const backdropOpacity = useSharedValue(0);

  const inputBox = useAnimatedStyle(() => ({
    borderColor: borderColor.value,
    boxShadow: `0px 0px 0px ${boxShadowWidth.value}px ${borderColor.value} inset`,
  }));

  const chevron = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(chevronProgress.value, [0, 1], [0, 180])}deg`,
      },
    ],
  }));

  const backdrop = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const handleOpen = useCallback(() => {
    borderColor.value = withTiming(theme.colors.brand, { duration: 150 });
    boxShadowWidth.value = withTiming(1, { duration: 150 });
    chevronProgress.value = withTiming(1, { duration: 200 });
    backdropOpacity.value = withTiming(1, { duration: 1500 });
  }, []);

  const handleClose = useCallback(() => {
    borderColor.value = withTiming(theme.colors.border, { duration: 150 });
    boxShadowWidth.value = withTiming(0, { duration: 150 });
    chevronProgress.value = withTiming(0, { duration: 200 });
    backdropOpacity.value = withTiming(0, { duration: 0 });
  }, []);

  return {
    inputBox,
    chevron,
    backdrop,
    handleOpen,
    handleClose,
  };
};
