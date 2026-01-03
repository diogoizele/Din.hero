import { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { BorderRadiuses, Colors, Text, View } from 'react-native-ui-lib';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import { currencyFormat } from '@core/helpers/currency';
import { useTheme } from '@core/hooks/useTheme';
import Icon from '@core/components/Icon';
import { Bill } from '@features/Bills/types/Bill';

import { categoryOptions } from '../../Bills/static/dropdownOptions';

export type SimpleBillCardProps = Bill & {
  onPaid: (id: string, paymentDate: Date) => Promise<void> | void;
  onPress: (bill: Bill) => void;
};

export default function SimpleBillCard(props: SimpleBillCardProps) {
  const { colors, borderRadiuses } = useTheme();

  const [visible, setVisible] = useState(true);

  const cardOpacity = useSharedValue(1);
  const cardHeight = useSharedValue(80);

  const translateX = useSharedValue(0);
  const MAX_TRANSLATE_X = -115;
  const MIN_SWIPE_TO_DELETE = -84;
  const PAN_GESTURE_TOLERANCE = 10;

  const handlePaid = async () => {
    await props.onPaid(props.id, new Date());
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

  const handlePress = () => {
    props?.onPress(props);
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
      runOnJS(handlePress)();
    });

  const composedGesture = Gesture.Simultaneous(panGesture, tapGesture);

  const animatedContainerStyle = useAnimatedStyle(() => ({
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

  if (!visible) {
    return null;
  }

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
      <GestureDetector gesture={composedGesture}>
        <Animated.View style={animatedCardStyle}>
          <View paddingV-20 bg-white paddingH-16 br40 row centerV>
            <View flex>
              <Text text70BO>{props.description}</Text>
              {props.amount && props.amount !== 0 ? (
                <Text text80 color={colors.$textNeutral}>
                  {currencyFormat(props.amount)}
                </Text>
              ) : (
                <TouchableOpacity
                  style={styles.pendingButton}
                  onPress={() => {}}>
                  <Icon
                    name="triangle-exclamation"
                    size={12}
                    color={colors.yellow10}
                  />
                  <Text text80BO color={colors.yellow10}>
                    Definir valor
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            {props.category && (
              <View marginR-12>
                <Icon
                  name={
                    categoryOptions.find(
                      option => option.value === props.category,
                    )?.icon!
                  }
                  size={20}
                  color={colors.textPrimary}
                />
              </View>
            )}
          </View>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}

export const styles = StyleSheet.create({
  rightActionText: {
    width: 100,
  },

  pendingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
    flexShrink: 1,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: Colors.yellow70,
    borderRadius: 8,
  },
});
