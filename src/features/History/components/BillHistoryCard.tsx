import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';

import { currencyFormat } from '@core/helpers/currency';
import Icon, { IconName } from '@core/components/Icon';
import { formatSmartDate } from '@core/helpers/date';

import { BillStatus, BillType } from '@features/Bills/types';
import { categoryOptions } from '@features/Bills/static/dropdownOptions';

import { HistoryBill } from '../types/HistoryBill';
import { billCardUiState } from '../static/billCardUiState';
import {
  AppRoutes,
  AppStackNavigationProps,
} from '../../../core/navigation/PrivateStackNavigator.types';

type Props = {
  bill: HistoryBill;
};

export const BillHistoryCard = ({ bill }: Props) => {
  const navigation = useNavigation<AppStackNavigationProps>();

  const secondaryLabel = (() => {
    if (bill.billType === BillType.INSTALLMENT && bill.installment) {
      return `Parcela ${bill.installment.current}/${bill.installment.total}`;
    }
    if (bill.billType === BillType.RECURRING) {
      return 'Recorrente';
    }
    return null;
  })();

  const dataLabel = {
    [BillStatus.PAID_TODAY]: 'Pago hoje',
    [BillStatus.PAID_YESTERDAY]: 'Pago ontem',
    [BillStatus.PAID]: `Pago dia ${formatSmartDate(bill.paymentDate)}`,
    [BillStatus.OVERDUE_YESTERDAY]: 'Venceu ontem',
    [BillStatus.OVERDUE]: `Venceu ${formatSmartDate(bill.dueDate)}`,
    [BillStatus.DUE_TODAY]: 'Vence hoje',
    [BillStatus.DUE_TOMORROW]: 'Vence amanhã',
    [BillStatus.UPCOMING]: `Vence ${formatSmartDate(bill.dueDate)}`,
  };

  const { iconColor, icon, dataLabelColor, dataLabelBackground } =
    billCardUiState[bill.status];

  const iconName = categoryOptions.find(
    option => option.value === bill.category,
  )?.icon as IconName;

  const handleNavigateToBillDetails = () => {
    navigation.navigate(AppRoutes.HISTORY_DETAILS, { billId: bill.id });
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handleNavigateToBillDetails}>
      <View style={styles.card}>
        <View style={styles.left}>
          <View style={styles.info}>
            <View style={styles.iconAndDescription}>
              {iconName && (
                <Icon name={iconName} size={16} color={Colors.textPrimary} />
              )}
              <Text style={styles.description} numberOfLines={1}>
                {bill.description}
              </Text>
            </View>

            <View style={styles.metaInfo}>
              {secondaryLabel && (
                <Text style={styles.metaText}>{secondaryLabel}</Text>
              )}
              <View
                backgroundColor={dataLabelBackground}
                style={styles.dateLabelContainer}>
                <Icon name={icon} size={14} color={iconColor} />
                <Text style={styles.metaText} color={dataLabelColor}>
                  {dataLabel[bill.status]}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.right}>
          <Text
            style={[
              styles.amount,
              bill.status === BillStatus.PAID && styles.amountPaid,
              bill.status === BillStatus.OVERDUE && styles.amountOverdue,
            ]}>
            {currencyFormat(bill.amount ?? 0)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 12,

    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: 8,
    justifyContent: 'center',
  },
  info: {
    flex: 1,
  },
  iconAndDescription: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  description: {
    fontSize: 15,
    fontWeight: '600',
  },
  metaInfo: {
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    fontWeight: '500',
  },
  dateLabelContainer: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  right: {
    marginLeft: 12,
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
  },
  amountPaid: {
    color: Colors.green30,
  },
  amountOverdue: {
    color: Colors.red30,
  },
});
