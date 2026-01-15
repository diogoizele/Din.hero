import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib';

import { useTheme } from '@core/hooks';
import { currencyFormat } from '@core/helpers/currency';
import { Icon } from '@core/components';
import { categoryOptions } from '@features/Bills/static/dropdownOptions';
import {
  AppRoutes,
  AppStackNavigationProps,
} from '@core/navigation/PrivateStackNavigator.types';

import { RecurringRule } from '../types/RecurringRule';

type Props = {
  rule: RecurringRule;
  onPress?: (rule: RecurringRule) => void;
};

export const RecurringRuleCard = ({ rule, onPress }: Props) => {
  const { shadows, colors } = useTheme();
  const navigation = useNavigation<AppStackNavigationProps>();

  const handlePress = () => {
    if (onPress) {
      onPress(rule);
    }

    navigation.navigate(AppRoutes.RECURRING_RULE_DETAILS, {
      recurringRuleId: rule.id,
    });
  };

  const { icon } =
    categoryOptions.find(({ value }) => value === rule.category) || {};

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.touchable, shadows.small]}>
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    marginHorizontal: 4,
    marginTop: 2,
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 4,
  },
});
