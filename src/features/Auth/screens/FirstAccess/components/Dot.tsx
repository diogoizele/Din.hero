import { StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { SCREEN_WIDTH } from '../constants/layout';

type Props = {
  index: number;
  scrollX: Animated.SharedValue<number>;
  color: string;
};

export function Dot({ index, scrollX, color }: Props) {
  const animStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * SCREEN_WIDTH,
      index * SCREEN_WIDTH,
      (index + 1) * SCREEN_WIDTH,
    ];
    return {
      width: interpolate(
        scrollX.value,
        inputRange,
        [6, 20, 6],
        Extrapolation.CLAMP,
      ),
      opacity: interpolate(
        scrollX.value,
        inputRange,
        [0.35, 1, 0.35],

        Extrapolation.CLAMP,
      ),
    };
  });

  return (
    <Animated.View
      style={[{ backgroundColor: color }, styles.container, animStyle]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    height: 6,
    borderRadius: 3,
  },
});
