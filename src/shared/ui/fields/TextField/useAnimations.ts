import { useCallback, useEffect } from 'react';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useNewTheme } from '@shared/hooks';

import { TextFieldProps } from './TextField';

export const useAnimations = ({
  error = false,
  onBlur,
  onFocus,
}: Partial<TextFieldProps>) => {
  const theme = useNewTheme();

  const isError = useSharedValue(error);
  const isFocused = useSharedValue(false);

  const borderColor = useDerivedValue(() => {
    if (isError.value) {
      return withTiming(theme.colors.danger, { duration: 150 });
    }

    if (isFocused.value) {
      return withTiming(theme.colors.brand, { duration: 150 });
    }

    return withTiming(theme.colors.border, { duration: 150 });
  });

  const shadowWidth = useDerivedValue(() =>
    withTiming(isError.value || isFocused.value ? 1 : 0, { duration: 150 }),
  );

  const labelColor = useDerivedValue(() => {
    if (isError.value) {
      return withTiming(theme.colors.danger, { duration: 150 });
    }

    return withTiming(theme.colors.textSecondary, { duration: 150 });
  });

  const errorProgress = useDerivedValue(() =>
    withTiming(isError.value ? 1 : 0, { duration: 150 }),
  );

  const inputBox = useAnimatedStyle(() => {
    const color = borderColor.value;
    const width = shadowWidth.value;
    return {
      borderColor: color,
      boxShadow: `0px 0px 0px ${width}px ${color} inset`,
    };
  });
  const labelStyle = useAnimatedStyle(() => ({
    color: labelColor.value,
  }));

  const errorMessageStyle = useAnimatedStyle(() => ({
    opacity: errorProgress.value,
    transform: [{ translateY: (1 - errorProgress.value) * -4 }],
  }));

  const handleFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      isFocused.value = true;
      onFocus?.(e);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      isFocused.value = false;
      onBlur?.(e);
    },
    [onBlur],
  );

  useEffect(() => {
    isError.value = error;
  }, [error]);

  return { inputBox, labelStyle, errorMessageStyle, handleFocus, handleBlur };
};
