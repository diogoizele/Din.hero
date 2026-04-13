import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { useNewTheme } from '@shared/hooks';

import { TextFieldProps } from './TextField';
import { useCallback } from 'react';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

export const useAnimations = ({ onBlur, onFocus }: Partial<TextFieldProps>) => {
  const theme = useNewTheme();

  const borderColor = useSharedValue(theme.colors.border);
  const boxShadowWidth = useSharedValue(0);

  const inputBox = useAnimatedStyle(() => ({
    borderColor: borderColor.value,
    boxShadow: `0px 0px 0px ${boxShadowWidth.value}px ${borderColor.value} inset`,
  }));

  const handleFocus = useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    borderColor.value = withTiming(theme.colors.brand, { duration: 150 });
    boxShadowWidth.value = withTiming(1, { duration: 150 });

    if (onFocus) {
      onFocus(e);
    }
  }, [onFocus]);

  const handleBlur = useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    borderColor.value = withTiming(theme.colors.border, { duration: 150 });
    boxShadowWidth.value = withTiming(0, { duration: 150 });

    if (onBlur) {
      onBlur(e);
    }
  }, [onBlur]);

  return {
    inputBox,

    handleFocus,
    handleBlur,
  };

};
