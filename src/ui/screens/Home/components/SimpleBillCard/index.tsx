import { Text, View } from 'react-native-ui-lib';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  runOnJS,
  withSpring,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import { capitalize } from '../../../../../helpers/strings';
import { formatSmartDate } from '../../../../../helpers/date';
import { currencyFormat } from '../../../../../helpers/currency';
import { useTheme } from '../../../../../providers/ThemeProvider';
import { styles } from './styles';

type Props = {
  paid: boolean;
  dueDate: string;
  amount: number;
};

export default function SimpleBillCard({ paid, dueDate, amount }: Props) {
  const [visible, setVisible] = useState(true);
  const { colors, borderRadiuses } = useTheme();
  const cardOpacity = useSharedValue(1);
  const cardHeight = useSharedValue(80);

  const translateX = useSharedValue(0);
  const MAX_TRANSLATE_X = -115;
  const MIN_SWIPE_TO_DELETE = -84;
  const PAN_GESTURE_TOLERANCE = 10;

  const handleRemove = () => {
    cardOpacity.value = withTiming(0, { duration: 200 });
    cardHeight.value = withTiming(
      0,
      {
        duration: 100,
      },
      finished => {
        if (finished) {
          runOnJS(setVisible)(false);
        }
      },
    );
  };

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      if (event.translationX < 0) {
        translateX.value = Math.max(event.translationX, MAX_TRANSLATE_X);
      }
    })
    .onEnd(() => {
      if (translateX.value < MIN_SWIPE_TO_DELETE) {
        runOnJS(handleRemove)();
      } else {
        translateX.value = withSpring(0, { damping: 15 });
      }
    })
    .activeOffsetX([-PAN_GESTURE_TOLERANCE, PAN_GESTURE_TOLERANCE]);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    height: cardHeight.value,
    opacity: cardOpacity.value,
    marginBottom: 16,
    marginHorizontal: 24,
    position: 'relative',
  }));

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const animatedBackgroundStyle = useAnimatedStyle(() => ({
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.accent,
    borderRadius: borderRadiuses.br40,
    opacity: interpolate(
      translateX.value,
      [0, MAX_TRANSLATE_X],
      [0, 1],
      'clamp',
    ),
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 8,
  }));

  if (!visible) return null;

  return (
    <Animated.View style={animatedContainerStyle}>
      <Animated.View style={animatedBackgroundStyle}>
        <Text
          text70BL
          width
          color={colors.white}
          style={styles.rightActionText}
          center>
          Marcar como paga
        </Text>
      </Animated.View>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={animatedCardStyle}>
          <View paddingV-20 bg-white paddingH-16 br40>
            <Text text70>{capitalize(formatSmartDate(dueDate))}</Text>
            <Text text80 color={colors.$textNeutral}>
              {currencyFormat(amount)}
            </Text>
          </View>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}
