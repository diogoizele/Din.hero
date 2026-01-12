import { StyleSheet } from 'react-native';
import { Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib';

import { useTheme } from '@core/hooks';
import { currencyFormat } from '@core/helpers/currency';
import { Icon } from '@core/components';
import { categoryOptions } from '@features/Bills/static/dropdownOptions';

import { RecurringRule } from '../types/RecurringRule';

type Props = {
  rule: RecurringRule;
  onPress?: (rule: RecurringRule) => void;
};

export const RecurringRuleCard = ({ rule, onPress }: Props) => {
  const { shadows, colors } = useTheme();

  const handlePress = () => {
    if (onPress) {
      onPress(rule);
    }
  };

  const { icon } =
    categoryOptions.find(({ value }) => value === rule.category) || {};

  return (
    <TouchableOpacity onPress={handlePress} style={styles.touchable}>
      <View style={[styles.card, shadows.small]}>
        <View row centerV gap-8>
          {icon && <Icon name={icon} size={16} color={colors.textPrimary} />}
          <Text text70BO>{rule.description}</Text>
        </View>
        {rule.fixedAmount && (
          <Text text80M color={colors.textPrimary}>
            Valor fixo: {currencyFormat(rule.fixedAmount)}
          </Text>
        )}
        <Text text80 color={colors.textSecondary}>
          Vence a cada dia {rule.dayOfMonth}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    width: '100%',
  },
  card: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.white,
    gap: 4,
  },
});
