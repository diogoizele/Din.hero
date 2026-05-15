import { useState } from 'react';
import { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

import { BillSectionItemProps } from './BillSectionItem';
import { Gesture } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';


const MAX_TRANSLATE_X = -115;
const MIN_SWIPE_TO_DELETE = -84;
const PAN_GESTURE_TOLERANCE = 10;

type UseGestureAndAnimationsParams = {
  onPaid: () => void
  onPress: () => void
} & Pick<BillSectionItemProps, 'amount'>


export function useGesturesAndAnimations({ amount, onPaid, onPress }: UseGestureAndAnimationsParams) {

  const [visible, setVisible] = useState(true);

  const cardOpacity = useSharedValue(1);
  const translateX = useSharedValue(0);

  const handleRemove = () => {
    cardOpacity.value = withTiming(0, { duration: 200 }, finished => {
      if (finished) {
        runOnJS(setVisible)(false);
        runOnJS(onPaid)();
      }
    });
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

  const tapGesture = Gesture.Tap()
    .maxDuration(250)
    .requireExternalGestureToFail(panGesture)
    .onEnd(() => {
      runOnJS(onPress)();
    });

  const composedGesture = (() => {
    const gestures = [];
    if (amount) {
      gestures.push(panGesture);
    }
    gestures.push(tapGesture);
    return Gesture.Simultaneous(...gestures);
  })();

  const animatedContainerStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
  }));

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const swipeStyle = useAnimatedStyle(() => ({
    ...StyleSheet.absoluteFillObject,
    opacity: interpolate(
      translateX.value,
      [0, MAX_TRANSLATE_X],
      [0, 1],
      'clamp',
    ),
  }));

  return {
    visible,
    animatedContainerStyle,
    animatedCardStyle,
    swipeStyle,
    composedGesture,
  };
}
