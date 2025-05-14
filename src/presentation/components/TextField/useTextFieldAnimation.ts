import { useCallback, useEffect } from 'react';
import {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { useTheme } from '../../../shared/providers/ThemeProvider';
import { styles } from './styles';

const animationValues = {
  focus: {
    translateY: -26,
    fontSize: 12,
    labelColor: 1,
    shadowWidth: 2,
  },
  blur: {
    translateY: 0,
    fontSize: 16,
    shadowWidth: 1,
    labelColor: 0,
  },
};

function useTextFieldAnimation(hasValue: boolean, isFocused: boolean) {
  const { colors } = useTheme();

  const labelTranslateY = useSharedValue(animationValues.blur.translateY);
  const labelFontSize = useSharedValue(animationValues.blur.fontSize);
  const labelColor = useSharedValue(animationValues.blur.labelColor);
  const inputBoxShadowWidth = useSharedValue(animationValues.blur.shadowWidth);

  useEffect(() => {
    if (isFocused) {
      labelTranslateY.value = timed(animationValues.focus.translateY, 200);
      labelFontSize.value = timed(animationValues.focus.fontSize, 200);
      inputBoxShadowWidth.value = timed(animationValues.focus.shadowWidth, 100);
      labelColor.value = timed(animationValues.focus.labelColor, 200);
    } else {
      labelTranslateY.value = timed(animationValues.blur.translateY, 200);
      labelFontSize.value = timed(animationValues.blur.fontSize, 200);
      inputBoxShadowWidth.value = timed(animationValues.blur.shadowWidth, 100);
      labelColor.value = timed(animationValues.blur.labelColor, 200);
    }

    if (hasValue) {
      labelTranslateY.value = timed(animationValues.focus.translateY, 200);
      labelFontSize.value = timed(animationValues.focus.fontSize, 200);
      labelColor.value = timed(animationValues.focus.labelColor, 200);
    }
  }, [isFocused, hasValue]);

  const timed = useCallback(
    (value: number, duration: number) => withTiming(value, { duration }),
    [],
  );

  const animatedPlaceholderStyle = useAnimatedStyle(() => ({
    ...styles.placeholder,
    backgroundColor: colors.$backgroundNeutralLight,
    color: labelColor.value === 1 ? colors.primary : colors.$textNeutralLight,
    fontSize: labelFontSize.value,
    transform: [{ translateY: labelTranslateY.value }],
  }));

  const animatedTextFieldStyle = useAnimatedStyle(() => ({
    ...styles.textField,
    boxShadow: `0px 0px 0px ${inputBoxShadowWidth.value}px ${
      inputBoxShadowWidth.value === 1
        ? colors.$textNeutralLight
        : colors.textSecondary
    }`,
  }));

  return {
    animatedPlaceholderStyle,
    animatedTextFieldStyle,
  };
}

export default useTextFieldAnimation;
