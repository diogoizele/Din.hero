import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import { currencyFormat } from '@shared/helpers/currency';
import { useStyled } from '@shared/hooks';
import { Text, Badge, Icon } from '@shared/ui';
import { Theme } from '@shared/theme';
import { Bill } from '@features/Bills/types/Bill';
import { categoryOptions } from '@features/Bills/static/dropdownOptions';

export type SimpleBillCardProps = Bill & {
  onPaid: (id: string, paymentDate: Date) => Promise<void> | void;
  onPress: (bill: Bill) => void;
  showDivider?: boolean;
};

export default function SimpleBillCard(props: SimpleBillCardProps) {
  const [styles, theme] = useStyled(createStyles);
  const [visible, setVisible] = useState(true);

  const cardOpacity = useSharedValue(1);
  const translateX = useSharedValue(0);

  const MAX_TRANSLATE_X = -115;
  const MIN_SWIPE_TO_DELETE = -84;
  const PAN_GESTURE_TOLERANCE = 10;

  const handlePaid = async () => {
    await props.onPaid(props.id, new Date());
  };

  const handleRemove = () => {
    cardOpacity.value = withTiming(0, { duration: 200 }, finished => {
      if (finished) {
        runOnJS(setVisible)(false);
        runOnJS(handlePaid)();
      }
    });
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

  const composedGesture = (() => {
    const gestures = [];
    if (props.amount) {
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

  const animatedBackgroundStyle = useAnimatedStyle(() => ({
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.brand,
    opacity: interpolate(
      translateX.value,
      [0, MAX_TRANSLATE_X],
      [0, 1],
      'clamp',
    ),
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
  }));

  if (!visible) {
    return null;
  }

  const categoryOption = categoryOptions.find(o => o.value === props.category);

  return (
    <>
      <Animated.View style={animatedContainerStyle}>
        {/* Swipe-reveal background */}
        <Animated.View style={animatedBackgroundStyle}>
          <Text color={theme.colors.white} style={styles.rightActionText}>
            Marcar como paga
          </Text>
        </Animated.View>

        <GestureDetector gesture={composedGesture}>
          <Animated.View style={[animatedCardStyle, styles.row]}>
            {/* Category icon */}
            {categoryOption?.icon ? (
              <View style={[styles.iconWrapper]}>
                <Icon
                  name={categoryOption.icon}
                  size={20}
                  color={theme.colors.textPrimary}
                />
              </View>
            ) : null}

            {/* Description + category label */}
            <View style={styles.textContainer}>
              <Text numberOfLines={1} style={styles.description}>
                {props.description}
              </Text>
              <View style={styles.amountContainer}>
                {props.amount && props.amount !== 0 ? (
                  <Text style={styles.amount}>
                    {currencyFormat(props.amount)}
                  </Text>
                ) : (
                  <Badge
                    iconStyle="outlined"
                    text="Definir valor"
                    variant="warning"
                  />
                )}
              </View>
            </View>

            {/* Amount */}
          </Animated.View>
        </GestureDetector>

        {/* Inset divider — rendered after the gesture view so it stays above swipe bg */}
      </Animated.View>
      {props.showDivider && <View style={styles.divider} />}
    </>
  );
}

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing(1.5),
      paddingVertical: theme.spacing(1.5),
      backgroundColor: theme.colors.surface,
      height: 72,
    },

    iconWrapper: {
      width: 44,
      height: 44,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
      flexShrink: 0,
      backgroundColor: theme.colors.brandSubtle,
    },

    textContainer: {
      flex: 1,
      gap: 2,
    },

    description: {
      fontSize: 15,
      fontWeight: '500',
      color: theme.colors.textPrimary,
    },

    amountContainer: {
      flexShrink: 0,
    },

    amount: {
      fontSize: 13,
      color: theme.colors.textSecondary,
    },

    rightActionText: {
      width: 100,
      textAlign: 'center',
    },

    divider: {
      marginHorizontal: theme.spacing(3),
      height: StyleSheet.hairlineWidth,
      backgroundColor: theme.colors.border,
    },
  });
