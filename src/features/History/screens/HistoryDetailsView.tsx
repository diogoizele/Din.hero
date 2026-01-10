import { useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Colors, Text, View } from 'react-native-ui-lib';

import { Header } from '@core/components';
import {
  AppRoutes,
  AppStackNavigationProps,
  AppStackParamList,
} from '@core/navigation/PrivateStackNavigator.types';
import { useAppDispatch, useAppSelector } from '@core/hooks';

import { fetchBillDetails } from '../stores/historyDetails/historyDetails.thunks';
import { useLoading } from '../../../core/providers/LoadingProvider';
import {
  selectHistoryBillDetails,
  selectHistoryBillDetailsStatus,
} from '../stores/historyDetails/historyDetails.selectors';
import { StyleSheet } from 'react-native';
import { BillType } from '../../Bills/types';
import { currencyFormat } from '../../../core/helpers/currency';
import { formatFullDatePtBR, parseAppDate } from '../../../core/helpers/date';
import { categoryOptions } from '../../Bills/static/dropdownOptions';

type Props = {
  navigation: AppStackNavigationProps;
  route: { params: AppStackParamList[AppRoutes.HISTORY_DETAILS] };
  onEdit: () => void;
  onDelete: () => void;
  onMarkAsPaid: () => void;
};

function HistoryDetailsView({ route, onEdit, onDelete, onMarkAsPaid }: Props) {
  const { billId } = route.params;
  const dispatch = useAppDispatch();
  const { setIsLoading } = useLoading();
  const bill = useAppSelector(selectHistoryBillDetails);
  const status = useAppSelector(selectHistoryBillDetailsStatus);
  const isLoading = status === 'loading';

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchBillDetails(billId));
    }, [billId]),
  );

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  if (!bill) {
    return (
      <View flex center>
        <Text>Conta não encontrada.</Text>
      </View>
    );
  }

  const isPaid = Boolean(bill?.paymentDate);
  const isOverdue = !isPaid && parseAppDate(bill?.dueDate) < new Date();
  const categoryLabel = categoryOptions.find(
    option => option.value === bill.category,
  )?.label;

  return (
    <View useSafeArea>
      <Header title="Detalhes da conta" />
      <View padding-24>
        <Text style={styles.description}>{bill.description}</Text>

        <Text style={styles.amount}>{currencyFormat(bill.amount ?? 0)}</Text>

        <View
          style={[
            styles.statusBadge,
            isPaid
              ? styles.statusPaid
              : isOverdue
              ? styles.statusOverdue
              : styles.statusOpen,
          ]}>
          <Text style={styles.statusText}>
            {isPaid ? 'Paga' : isOverdue ? 'Vencida' : 'Em aberto'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações</Text>

          <Row label="Tipo">
            {bill.billType === BillType.ONE_TIME && 'Conta avulsa'}
            {bill.billType === BillType.RECURRING && 'Conta recorrente'}
            {bill.billType === BillType.INSTALLMENT &&
              `Parcelamento (${bill.installment?.current}/${bill.installment?.total})`}
          </Row>

          <Row label="Categoria">{categoryLabel ?? '-'}</Row>

          <Row label="Vencimento">{formatFullDatePtBR(bill.dueDate)}</Row>

          <Row label="Pagamento">
            {bill.paymentDate
              ? formatFullDatePtBR(bill.paymentDate)
              : 'Não pago'}
          </Row>

          {bill.notes && (
            <View style={styles.notes}>
              <Text style={styles.label}>Observação</Text>
              <Text style={styles.noteText}>{bill.notes}</Text>
            </View>
          )}
        </View>

        {/* Ações */}
        <View style={styles.actions}>
          {!isPaid && (
            <Text style={styles.primaryAction} onPress={onMarkAsPaid}>
              Marcar como paga
            </Text>
          )}

          <Text style={styles.secondaryAction} onPress={onEdit}>
            Editar conta
          </Text>

          <Text style={styles.dangerAction} onPress={onDelete}>
            Excluir conta
          </Text>
        </View>
      </View>
    </View>
  );
}

function Row({ label, children }: any) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },

  amount: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },

  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 24,
  },
  statusPaid: { backgroundColor: Colors.green70 },
  statusOpen: { backgroundColor: Colors.orange70 },
  statusOverdue: { backgroundColor: Colors.red70 },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.white,
  },

  section: {
    marginBottom: 32,
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

  notes: {
    marginTop: 12,
  },
  noteText: {
    fontSize: 14,
    lineHeight: 20,
  },

  actions: {
    gap: 16,
  },
  primaryAction: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.green10,
  },
  secondaryAction: {
    fontSize: 16,
    color: Colors.blue10,
  },
  dangerAction: {
    fontSize: 16,
    color: Colors.red10,
  },
});

export default HistoryDetailsView;
