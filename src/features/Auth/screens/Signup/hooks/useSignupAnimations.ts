import { useCallback, useRef } from 'react';
import {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';

export function useSignupAnimations() {
  const hasAnimated = useRef(false);

  const { progress } = useReanimatedKeyboardAnimation();

  const heroOpacity = useSharedValue(0);

  const keyboardTranslate = useDerivedValue(() =>
    withSpring(progress.value > 0 ? 200 : 0, {
      damping: 16,
      stiffness: 130,
    }),
  );

  useFocusEffect(
    useCallback(() => {
      if (!hasAnimated.current) {
        heroOpacity.value = withDelay(100, withTiming(1, { duration: 600 }));
        hasAnimated.current = true;
      } else {
        heroOpacity.value = 1;
      }

      return () => {
        if (!hasAnimated.current) {
          heroOpacity.value = 0;
        }
      };
    }, []),
  );

  const heroStyle = useAnimatedStyle(() => ({
    opacity: heroOpacity.value,
    transform: [{ translateY: keyboardTranslate.value }],
  }));

  return { heroStyle };
}
