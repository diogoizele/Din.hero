import {
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';

export function useLoginAnimations() {
  const { progress } = useReanimatedKeyboardAnimation();
  const measuredTextHeight = useSharedValue<'auto' | number>('auto');

  const animatedHeight = useDerivedValue(() =>
    typeof measuredTextHeight.value === 'number'
      ? measuredTextHeight.value * (1 - progress.value)
      : 'auto',
  );

  const animatedOpacity = useDerivedValue(() =>
    withSpring(1 - progress.value, {
      damping: 16,
      stiffness: 120,
    }),
  );

  const heroTextStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    opacity: animatedOpacity.value,
    overflow: 'hidden',
  }));

  const logoBadgeStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSpring(progress.value > 0 ? 0.62 : 1, {
          damping: 16,
          stiffness: 130,
        }),
      },
      {
        translateY: withSpring(progress.value > 0 ? 60 : 0, {
          damping: 16,
          stiffness: 130,
        }),
      },
    ],
  }));

  const onTextLayout = (height: number) => {
    if (measuredTextHeight.value === 0) {
      measuredTextHeight.value = height;
    }
  };

  return { heroTextStyle, logoBadgeStyle, onTextLayout };
}
