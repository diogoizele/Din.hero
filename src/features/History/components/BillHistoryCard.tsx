import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';

import { currencyFormat } from '@core/helpers/currency';
import Icon, { IconName } from '@core/components/Icon';
import {
  formatSmartDate,
  getOnlyDatePart,
  now,
  parseAppDate,
} from '@core/helpers/date';

import { Bill, BillType } from '@features/Bills/types';
import { isToday, isTomorrow, isYesterday } from 'date-fns';
import { categoryOptions } from '../../Bills/static/dropdownOptions';

type Props = {
  bill: Bill;
  onPress: (bill: Bill) => void;
};

export const BillHistoryCard = ({ bill, onPress }: Props) => {
  const isPaid = Boolean(bill.paymentDate);
  const isOverdue =
    !isPaid &&
    parseAppDate(bill.dueDate) < parseAppDate(getOnlyDatePart(now()));
  const isOverdueYesterday = isYesterday(parseAppDate(bill.dueDate));
  const isOverdueToday = isToday(parseAppDate(bill.dueDate));
  const isOverdueTomorrow = isTomorrow(parseAppDate(bill.dueDate));

  const getCardDynamicProps = (): {
    icon: IconName;
    iconColor: string;
    dataLabelColor: string;
    dataLabelBackground: string;
  } => {
    if (isPaid) {
      return {
        icon: 'circle-check',
        iconColor: Colors.green40,
        dataLabelColor: Colors.green30,
        dataLabelBackground: Colors.green80,
      };
    }

    if (isOverdueToday) {
      return {
        icon: 'circle-exclamation',
        iconColor: Colors.yellow20,
        dataLabelColor: Colors.yellow10,
        dataLabelBackground: Colors.yellow80,
      };
    }

    if (isOverdue) {
      return {
        icon: 'circle-exclamation',
        iconColor: Colors.red40,
        dataLabelColor: Colors.red30,
        dataLabelBackground: Colors.red80,
      };
    }

    return {
      icon: 'clock',
      iconColor: Colors.grey40,
      dataLabelColor: Colors.grey30,
      dataLabelBackground: Colors.grey70,
    };
  };

  const secondaryLabel = (() => {
    if (bill.billType === BillType.INSTALLMENT && bill.installment) {
      return `Parcela ${bill.installment.current}/${bill.installment.total}`;
    }
    if (bill.billType === BillType.RECURRING) {
      return 'Recorrente';
    }
    return null;
  })();

  const getDataLabel = () => {
    if (isPaid && bill.paymentDate) {
      if (isToday(bill.paymentDate)) {
        return 'Pago hoje';
      }

      if (isYesterday(bill.paymentDate)) {
        return 'Pago ontem';
      }

      return `Pago dia ${formatSmartDate(bill.paymentDate!)}`;
    }

    if (isOverdueYesterday) {
      return 'Venceu ontem';
    }
    if (isOverdueToday) {
      return 'Vence hoje';
    }

    if (isOverdueTomorrow) {
      return 'Vence amanhã';
    }

    if (isOverdue) {
      return `Venceu ${formatSmartDate(bill.dueDate)}`;
    }

    return `Vence ${formatSmartDate(bill.dueDate)}`;
  };

  const { iconColor, icon, dataLabelColor, dataLabelBackground } =
    getCardDynamicProps();

  const iconName = categoryOptions.find(
    option => option.value === bill.category,
  )?.icon as IconName;

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => onPress(bill)}>
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
                  {getDataLabel()}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.right}>
          <Text
            style={[
              styles.amount,
              isPaid && styles.amountPaid,
              isOverdue && styles.amountOverdue,
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
