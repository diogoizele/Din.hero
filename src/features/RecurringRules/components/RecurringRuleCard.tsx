import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';

import { useStyled } from '@shared/hooks';
import { Theme } from '@shared/theme';
import { currencyFormat } from '@shared/helpers/currency';
import { Icon } from '@shared/components';
import { categoryOptions } from '@features/Bills/static/dropdownOptions';
import {
  AppRoutes,
  AppStackNavigationProps,
} from '@app/navigation/AppStackNavigator.types';

import { RecurringRule } from '../types/RecurringRule';

type Props = {
  rule: RecurringRule;
  onPress?: (rule: RecurringRule) => void;
};

export const RecurringRuleCard = ({ rule, onPress }: Props) => {
  const [styles, theme] = useStyled(createStyles);
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
    <TouchableOpacity onPress={handlePress} style={styles.touchable}>
      <View row centerV gap-8>
        {icon && (
          <Icon name={icon} size={16} color={theme.colors.textPrimary} />
        )}
        <Text text70BO>{rule.description}</Text>
      </View>
      {rule.fixedAmount && (
        <Text text80M color={theme.colors.textPrimary}>
          Valor fixo: {currencyFormat(rule.fixedAmount)}
        </Text>
      )}
      <Text text80 color={theme.colors.textSecondary}>
        Vence a cada dia {rule.dayOfMonth}
      </Text>
    </TouchableOpacity>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    touchable: {
      marginHorizontal: 4,
      marginTop: 2,
      backgroundColor: theme.colors.white,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      gap: 4,
    },
  });
