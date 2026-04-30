import { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';

export function useSignupAnimations() {
  const { progress } = useReanimatedKeyboardAnimation();

  const heroStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withSpring(progress.value > 0 ? 200 : 0, {
          damping: 16,
          stiffness: 130,
        }),
      },
    ],
  }));

  return { heroStyle };
}
