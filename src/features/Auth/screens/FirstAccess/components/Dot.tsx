import { memo } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { SCREEN_WIDTH } from '../constants/layout';

type Props = {
  index: number;
  scrollX: SharedValue<number>;
  color: string;
  onPress: () => void;
};

// memo evita re-render quando o pai re-renderiza por razões não relacionadas.
// As animações de largura/opacidade rodam 100% na UI thread via useAnimatedStyle.
export const Dot = memo(({ index, scrollX, color, onPress }: Props) => {
  const scale = useSharedValue(1);

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
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.7, { damping: 20, stiffness: 300 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 20, stiffness: 300 });
      }}
      hitSlop={{ top: 10, bottom: 10, left: 6, right: 6 }}>
      <Animated.View
        style={[{ backgroundColor: color }, styles.container, animStyle]}
      />
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    height: 6,
    borderRadius: 3,
  },
});
