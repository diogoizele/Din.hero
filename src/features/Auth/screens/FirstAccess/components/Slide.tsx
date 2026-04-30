import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { Theme } from '@shared/theme';
import { useStyled } from '@shared/hooks';
import { applyOpacity } from '@shared/helpers/colors';

import { SCREEN_WIDTH } from '../constants/layout';
import { SlideItem } from '../constants/slides';

type Props = {
  slide: SlideItem;
  index: number;
  scrollX: Animated.SharedValue<number>;
};

export function Slide({ slide, index, scrollX }: Props) {
  const styles = useStyled(createStyles);

  const animStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * SCREEN_WIDTH,
      index * SCREEN_WIDTH,
      (index + 1) * SCREEN_WIDTH,
    ];
    return {
      opacity: interpolate(
        scrollX.value,
        inputRange,
        [0, 1, 0],
        Extrapolation.CLAMP,
      ),
      transform: [
        {
          scale: interpolate(
            scrollX.value,
            inputRange,
            [0.92, 1, 0.92],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <View style={styles.slide}>
      <Animated.View style={[styles.inner, animStyle]}>
        <Text style={styles.headline}>{slide.headline}</Text>
        <Text style={styles.subline}>{slide.subline}</Text>
      </Animated.View>
    </View>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    slide: {
      width: SCREEN_WIDTH,
      alignItems: 'center',
      paddingHorizontal: theme.spacing(4),
    },
    inner: {
      alignItems: 'center',
      gap: theme.spacing(1.5),
    },
    headline: {
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 40,
      color: theme.colors.white,
      textAlign: 'center',
      letterSpacing: -0.5,
    },
    subline: {
      fontSize: 15,
      fontWeight: '400',
      lineHeight: 22,
      color: applyOpacity(theme.colors.white, 0.72),
      textAlign: 'center',
    },
  });
