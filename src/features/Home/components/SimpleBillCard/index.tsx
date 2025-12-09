import { Text, View } from 'react-native-ui-lib';
import Animated from 'react-native-reanimated';
import { GestureDetector } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

import { currencyFormat } from '@app/helpers/currency';
import { useTheme } from '@app/hooks/useTheme';
import { Bill } from '@data/models/Bill';

import { useComponent } from './useComponent';

export type SimpleBillCardProps = Pick<
  Bill,
  'amount' | 'dueDate' | 'paid' | 'id' | 'description'
> & {
  onPaid: (id: string, paymentDate: string) => Promise<void>;
};

export default function SimpleBillCard(props: SimpleBillCardProps) {
  const { colors } = useTheme();
  const {
    visible,
    animatedBackgroundStyle,
    animatedCardStyle,
    animatedContainerStyle,
    panGesture,
  } = useComponent(props);

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
      <GestureDetector gesture={panGesture}>
        <Animated.View style={animatedCardStyle}>
          <View paddingV-20 bg-white paddingH-16 br40>
            <Text text70>{props.description}</Text>
            <Text text80 color={colors.$textNeutral}>
              {currencyFormat(props.amount)}
            </Text>
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
});
