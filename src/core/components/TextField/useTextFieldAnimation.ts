import { useCallback, useEffect } from 'react';
import {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { useTheme } from '../../hooks/useTheme';
import { styles } from './styles';

type Props = {
  hasValue: boolean;
  isFocused: boolean;
  error?: string;
  multiline?: boolean;
};

const animationValues = {
  focus: {
    translateY: -26,
    translateYMultiline: -10,
    fontSize: 12,
    labelColor: 1,
    shadowWidth: 2,
    prefixOpacity: 1,
    prefixTranslate: 0,
  },
  blur: {
    translateY: 0,
    translateYMultiline: 12,
    fontSize: 14,
    shadowWidth: 1,
    labelColor: 0,
    prefixOpacity: 0,
    prefixTranslate: -4,
  },
};

function useTextFieldAnimation({
  hasValue,
  isFocused,
  multiline,
  error,
}: Props) {
  const { colors } = useTheme();

  const labelTranslateY = useSharedValue(
    multiline
      ? animationValues.blur.translateYMultiline
      : animationValues.blur.translateY,
  );
  const labelFontSize = useSharedValue(animationValues.blur.fontSize);
  const labelColor = useSharedValue(animationValues.blur.labelColor);
  const inputBoxShadowWidth = useSharedValue(animationValues.blur.shadowWidth);
  const prefixOpacity = useSharedValue(animationValues.blur.prefixOpacity);
  const prefixTranslateX = useSharedValue(animationValues.blur.prefixTranslate);
  const fieldMarignBottom = useSharedValue(0);

  useEffect(() => {
    if (isFocused) {
      labelTranslateY.value = timed(
        multiline
          ? animationValues.focus.translateYMultiline
          : animationValues.focus.translateY,
        200,
      );
      labelFontSize.value = timed(animationValues.focus.fontSize, 200);
      inputBoxShadowWidth.value = timed(animationValues.focus.shadowWidth, 100);
      labelColor.value = timed(animationValues.focus.labelColor, 200);
      prefixOpacity.value = timed(animationValues.focus.prefixOpacity, 210);
      prefixTranslateX.value = timed(
        animationValues.focus.prefixTranslate,
        200,
      );
    } else {
      labelTranslateY.value = timed(
        multiline
          ? animationValues.blur.translateYMultiline
          : animationValues.blur.translateY,
        200,
      );
      labelFontSize.value = timed(animationValues.blur.fontSize, 200);
      inputBoxShadowWidth.value = timed(animationValues.blur.shadowWidth, 100);
      labelColor.value = timed(animationValues.blur.labelColor, 200);
      prefixOpacity.value = timed(animationValues.blur.prefixOpacity, 200);
      prefixTranslateX.value = timed(animationValues.blur.prefixTranslate, 200);
    }

    if (hasValue) {
      labelTranslateY.value = timed(
        multiline
          ? animationValues.focus.translateYMultiline
          : animationValues.focus.translateY,
        200,
      );
      labelFontSize.value = timed(animationValues.focus.fontSize, 200);
      labelColor.value = timed(animationValues.focus.labelColor, 200);
      prefixOpacity.value = timed(animationValues.focus.prefixOpacity, 210);
      prefixTranslateX.value = timed(
        animationValues.focus.prefixTranslate,
        200,
      );
    }
  }, [isFocused, hasValue]);

  useEffect(() => {
    if (error) {
      fieldMarignBottom.value = timed(16, 200);
    } else {
      fieldMarignBottom.value = timed(0, 200);
    }
  }, [error]);

  const timed = useCallback(
    (value: number, duration: number) => withTiming(value, { duration }),
    [],
  );

  const animatedPlaceholderStyle = useAnimatedStyle(() => ({
    ...styles.placeholder,
    backgroundColor: colors.$backgroundNeutralLight,
    color: labelColor.value === 1 ? colors.primary : colors.$textNeutral,
    fontSize: labelFontSize.value,
    transform: [{ translateY: labelTranslateY.value }],
  }));

  const animatedTextFieldStyle = useAnimatedStyle(() => ({
    ...styles.textField,
    marginBottom: fieldMarignBottom.value,
    boxShadow: `0px 0px 0px ${inputBoxShadowWidth.value}px ${
      inputBoxShadowWidth.value === 1
        ? colors.$textNeutralLight
        : colors.primary
    }`,
  }));

  const animatedPrefixStyle = useAnimatedStyle(() => ({
    ...styles.prefix,
    opacity: prefixOpacity.value,
    transform: [{ translateX: prefixTranslateX.value }],
  }));

  return {
    animatedPlaceholderStyle,
    animatedTextFieldStyle,
    animatedPrefixStyle,
  };
}

export default useTextFieldAnimation;
