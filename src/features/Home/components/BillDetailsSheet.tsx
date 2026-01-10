import { StyleSheet } from 'react-native';
import { Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib';

import { currencyFormat } from '@core/helpers/currency';
import Icon from '@core/components/Icon';
import { formatSmartDate } from '@core/helpers/date';
import { useAppDispatch, useAppSelector } from '@core/hooks';

import { Bill, BillType } from '@features/Bills/types';
import { categoryOptions } from '@features/Bills/static/dropdownOptions';

import { selectBottomSheetType } from '../stores/home.selectors';
import { setBottomSheetType } from '../stores/home.slice';
import { EditAmountInline } from './EditAmountInline';
import { mapBillToHistoryBill } from '../../History/mappers/mapBillToHistoryBill';

type Props = {
  bill: Bill | null;
  onResolvePending?: () => void;
};

export const BillDetailsSheet = ({ bill, onResolvePending }: Props) => {
  const dispatch = useAppDispatch();
  const bottomSheetType = useAppSelector(selectBottomSheetType);

  const isAmountPending = !bill?.amount || bill?.amount === 0;

  const categoryLabel = categoryOptions.find(
    option => option.value === bill?.category,
  )?.label;

  if (!bill) {
    return (
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Detalhes da conta</Text>
        <Text style={styles.value}>Nenhuma conta selecionada.</Text>
      </View>
    );
  }
  const { isOverdue } = mapBillToHistoryBill(bill);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>Detalhes da conta</Text>
          <Text style={styles.description}>{bill.description}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            isOverdue ? styles.statusOpen : styles.statusPaid,
          ]}>
          <Text
            style={[
              styles.statusText,
              isOverdue ? styles.statusTextOpen : styles.statusTextPaid,
            ]}>
            {isOverdue ? 'Vencida' : 'Em aberto'}
          </Text>
        </View>
      </View>

      {/* Valor */}
      {bottomSheetType === 'view' && isAmountPending && (
        <TouchableOpacity onPress={() => dispatch(setBottomSheetType('edit'))}>
          <View row centerV centerH gap-8>
            <Icon
              name="triangle-exclamation"
              size={24}
              color={Colors.yellow10}
            />
            <Text style={styles.pendingAmount}>Valor pendente</Text>
          </View>
          <Text style={styles.pendingHint}>Toque para informar o valor</Text>
        </TouchableOpacity>
      )}
      {bottomSheetType === 'view' && !isAmountPending && (
        <View style={styles.amountSection}>
          <Text style={styles.amount}>{currencyFormat(bill.amount ?? 0)}</Text>
          <Text style={styles.billType}>
            {bill.billType === BillType.RECURRING && 'Conta recorrente'}
            {bill.billType === BillType.INSTALLMENT &&
              `Parcela ${bill.installment?.current} de ${bill.installment?.total}`}
            {bill.billType === BillType.ONE_TIME && 'Conta única'}
          </Text>
        </View>
      )}
      {bottomSheetType === 'edit' && (
        <EditAmountInline
          value={bill.amount ?? 0}
          onClose={() => {
            dispatch(setBottomSheetType('view'));
          }}
        />
      )}

      {/* Datas */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Vencimento</Text>
          <Text style={styles.value}>{formatSmartDate(bill.dueDate)}</Text>
        </View>
      </View>

      {/* Metadados */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Categoria</Text>
          <Text style={styles.value}>{categoryLabel ?? '-'}</Text>
        </View>

        {bill.notes ? (
          <View style={styles.noteContainer}>
            <Text style={styles.label}>Observação</Text>
            <Text style={styles.note}>{bill.notes}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },

  /* Header */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerText: {
    flex: 1,
    marginRight: 12,
  },

  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusPaid: {
    backgroundColor: Colors.yellow70,
  },
  statusOpen: {
    backgroundColor: Colors.orange70,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusTextPaid: {
    color: Colors.yellow10,
  },
  statusTextOpen: {
    color: Colors.orange10,
  },

  /* Amount */
  amountSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  amount: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 4,
  },
  billType: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  pendingAmount: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.yellow10,
    textAlign: 'center',
  },

  pendingHint: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },

  pendingAction: {
    alignItems: 'center',
    marginTop: 12,
  },

  editHint: {
    fontSize: 13,
    color: Colors.textSecondary,
  },

  editAction: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
    marginTop: 4,
  },

  divider: {
    marginTop: 16,
  },

  /* Sections */
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
  },

  /* Note */
  noteContainer: {
    marginTop: 8,
  },
  note: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
});
