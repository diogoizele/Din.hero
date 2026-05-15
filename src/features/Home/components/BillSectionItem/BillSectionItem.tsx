import { memo } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { GestureDetector } from 'react-native-gesture-handler';

import { currencyFormat } from '@shared/helpers/currency';
import { useStyled } from '@shared/hooks';
import { Text, Badge, Icon } from '@shared/ui';
import { Bill } from '@features/Bills/types/Bill';
import { categoryOptions } from '@features/Bills/static/dropdownOptions';
import { createStyles } from './BillSectionItem.styles';
import { useGesturesAndAnimations } from './useGesturesAndAnimations';

export type BillSectionItemProps = Bill & {
  onPaid: (id: string, paymentDate: Date) => Promise<void> | void;
  onPress: (bill: Bill) => void;
  showDivider?: boolean;
};

const BillSectionItemComponent = (props: BillSectionItemProps) => {
  const [styles, theme] = useStyled(createStyles);

  const handlePaid = async () => {
    await props.onPaid(props.id, new Date());
  };

  const handlePress = () => {
    props?.onPress(props);
  };

  const {
    visible,
    swipeStyle,
    animatedCardStyle,
    animatedContainerStyle,
    composedGesture,
  } = useGesturesAndAnimations({
    amount: props.amount,
    onPress: handlePress,
    onPaid: handlePaid,
  });

  if (!visible) {
    return null;
  }

  const categoryOption = categoryOptions.find(o => o.value === props.category);

  return (
    <>
      <Animated.View style={animatedContainerStyle}>
        <Animated.View style={[styles.rightActionContainer, swipeStyle]}>
          <Text color={theme.colors.white} style={styles.rightActionText}>
            Marcar como paga
          </Text>
        </Animated.View>

        <GestureDetector gesture={composedGesture}>
          <Animated.View style={[animatedCardStyle, styles.row]}>
            {categoryOption?.icon ? (
              <View style={[styles.iconWrapper]}>
                <Icon
                  name={categoryOption.icon}
                  size={20}
                  color={theme.colors.textPrimary}
                />
              </View>
            ) : null}

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
                  <Badge text="Definir valor" variant="warning" />
                )}
              </View>
            </View>
          </Animated.View>
        </GestureDetector>
      </Animated.View>
      {props.showDivider && <View style={styles.divider} />}
    </>
  );
};

export const BillSectionItem = memo(BillSectionItemComponent);
