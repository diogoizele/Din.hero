import { useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Colors, Text, View } from 'react-native-ui-lib';
import { ScrollView } from 'react-native-gesture-handler';

import { Badge, BottomSheet, Button, Header } from '@core/components';
import {
  AppRoutes,
  AppStackNavigationProps,
  AppStackParamList,
} from '@core/navigation/PrivateStackNavigator.types';
import { useAppDispatch, useAppSelector } from '@core/hooks';
import { formatFullDatePtBR } from '@core/helpers/date';
import { useLoading } from '@core/providers/LoadingProvider';
import { currencyFormat } from '@core/helpers/currency';
import { useBottomSheet } from '@core/providers/BottomSheetProvider';
import { BillStatus, BillType } from '@features/Bills/types';
import { categoryOptions } from '@features/Bills/static/dropdownOptions';

import {
  deleteBill,
  fetchBillDetails,
} from '../stores/historyDetails/historyDetails.thunks';
import {
  selectHistoryBillDetails,
  selectHistoryBillDetailsStatus,
} from '../stores/historyDetails/historyDetails.selectors';
import { ActionCard } from '../components/ActionCard';
import { mapBillToHistoryBill } from '../mappers/mapBillToHistoryBill';
import { billCardUiState } from '../static/billCardUiState';
import { markBillAsPaid } from '../../Home/stores/home/home.thunks';
import { DeleteBillConfirmationSheet } from '../components/DeleteBillConfirmationSheet';

type Props = {
  navigation: AppStackNavigationProps;
  route: { params: AppStackParamList[AppRoutes.HISTORY_DETAILS] };
};

function HistoryDetailsView({ navigation, route }: Props) {
  const { billId } = route.params;
  const dispatch = useAppDispatch();
  const { setIsLoading } = useLoading();
  const deleteBillConfirmationSheet = useBottomSheet('deleteBillConfirmation');
  const bill = useAppSelector(selectHistoryBillDetails);
  const status = useAppSelector(selectHistoryBillDetailsStatus);

  const isLoading = status === 'loading';
  const historyBill = bill && mapBillToHistoryBill(bill);

  const { dataLabelBackground, dataLabelColor, icon, iconColor, variant } =
    billCardUiState[historyBill?.status ?? BillStatus.UPCOMING];

  const dataLabelMapper = {
    [BillStatus.PAID_TODAY]: 'Pago',
    [BillStatus.PAID_YESTERDAY]: 'Pago',
    [BillStatus.PAID]: 'Pago',
    [BillStatus.OVERDUE_YESTERDAY]: 'Vencida',
    [BillStatus.OVERDUE]: 'Vencida',
    [BillStatus.DUE_TODAY]: 'Vence hoje',
    [BillStatus.DUE_TOMORROW]: 'Vence amanhã',
    [BillStatus.UPCOMING]: undefined,
  };

  const dataLabel = dataLabelMapper[historyBill?.status ?? BillStatus.UPCOMING];

  const categoryLabel = categoryOptions.find(
    option => option.value === bill?.category,
  )?.label;

  const handleMarkAsPaid = () => {
    // Ver pra ou centralizar esse thunk ou criar um proprio pro contexto de history
    dispatch(markBillAsPaid({ id: billId, paymentDate: new Date() }));
    dispatch(fetchBillDetails(billId));
    navigation.reset({
      index: 2,
      routes: [
        { name: AppRoutes.HOME },
        { name: AppRoutes.HISTORY },
        { name: AppRoutes.HISTORY_DETAILS, params: { billId } },
      ],
    });
  };

  const handleEdit = () => {
    if (!bill) return;

    navigation.navigate(AppRoutes.BILLS_EDIT, { bill: bill });
  };

  const handleConfirmDelete = () => {
    deleteBillConfirmationSheet.present();
  };

  const handleDelete = () => {
    deleteBillConfirmationSheet.close();
    dispatch(deleteBill(billId));
    navigation.reset({
      index: 1,
      routes: [{ name: AppRoutes.HOME }, { name: AppRoutes.HISTORY }],
    });
  };

  const renderContent = () => {
    if (!bill) {
      return null;
    }

    return (
      <>
        <View flex-1>
          <View paddingH-24 marginT-24>
            <Text style={styles.description}>{bill.description}</Text>
            <View row centerV marginB-8 spread>
              <Text style={styles.amount}>
                {currencyFormat(bill.amount ?? 0)}
              </Text>
              {!bill.amount && (
                <Badge
                  icon="triangle-exclamation"
                  text="Valor pendente"
                  size="large"
                  variant="warning"
                  bold
                />
              )}
            </View>
            {dataLabel && (
              <Badge
                icon={icon}
                text={dataLabel}
                variant={variant}
                size="large"
                bold
                marginB-8
              />
            )}
          </View>

          <View>
            <Text marginL-24 style={styles.sectionTitle}>
              Ações
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.actions}>
              {![
                BillStatus.PAID,
                BillStatus.PAID_TODAY,
                BillStatus.PAID_YESTERDAY,
              ].includes(historyBill?.status ?? BillStatus.UPCOMING) &&
                bill.amount && (
                  <ActionCard
                    icon={{ name: 'circle-check', color: Colors.green40 }}
                    label="Marcar como paga"
                    onPress={handleMarkAsPaid}
                  />
                )}
              <ActionCard
                icon={{ name: 'pen', color: Colors.blue40 }}
                label="Editar"
                onPress={handleEdit}
              />
              <ActionCard
                icon={{ name: 'trash', color: Colors.red30 }}
                label="Excluir"
                onPress={handleConfirmDelete}
              />
            </ScrollView>
          </View>
          <View flex-1 padding-24 style={styles.section}>
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
        </View>
        <View paddingH-24>
          <View width="100%" marginT-16>
            <Button label="Voltar" onPress={navigation.goBack} />
          </View>
        </View>
      </>
    );
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchBillDetails(billId));
    }, [billId]),
  );

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  return (
    <View flex-1 useSafeArea>
      <Header title="Detalhes da conta" />
      {renderContent()}

      <BottomSheet ref={deleteBillConfirmationSheet.ref}>
        {bill && (
          <DeleteBillConfirmationSheet
            bill={bill}
            onClose={deleteBillConfirmationSheet.close}
            onDelete={handleDelete}
          />
        )}
      </BottomSheet>
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
    paddingHorizontal: 16,
  },
});

export default HistoryDetailsView;
