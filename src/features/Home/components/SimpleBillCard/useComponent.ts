import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import {
  useSharedValue,
  withTiming,
  runOnJS,
  withSpring,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';

import { useTheme } from '@shared/hooks/useTheme';
import { SimpleBillCardProps } from '.';

export const useComponent = ({ id, onPaid }: SimpleBillCardProps) => {
  const [visible, setVisible] = useState(true);
  const { colors, borderRadiuses } = useTheme();
  const cardOpacity = useSharedValue(1);
  const cardHeight = useSharedValue(80);

  const translateX = useSharedValue(0);
  const MAX_TRANSLATE_X = -115;
  const MIN_SWIPE_TO_DELETE = -84;
  const PAN_GESTURE_TOLERANCE = 10;

  const handlePaid = async () => {
    await onPaid(id, new Date().toISOString());
  };

  const handleRemove = async () => {
    cardOpacity.value = withTiming(0, { duration: 200 });
    cardHeight.value = withTiming(
      0,
      {
        duration: 100,
      },
      finished => {
        if (finished) {
          runOnJS(setVisible)(false);
          runOnJS(handlePaid)();
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
    position: 'relative',
    shadowColor: colors.$shadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 4,
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

  return {
    visible,
    animatedBackgroundStyle,
    animatedCardStyle,
    animatedContainerStyle,
    panGesture,
  };
};
