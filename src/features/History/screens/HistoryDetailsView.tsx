import { PropsWithChildren, useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomSheet, ActionCard } from '@shared/components';
import {
  AppRoutes,
  AppStackNavigationProps,
  AppStackParamList,
} from '@app/navigation/AppStackNavigator.types';
import { useAppDispatch, useAppSelector, useStyled } from '@shared/hooks';
import { Text, Badge, Button } from '@shared/ui';
import { Theme } from '@shared/theme';
import { formatFullDatePtBR } from '@shared/helpers/date';
import { useLoading } from '@app/providers/LoadingProvider';
import { currencyFormat } from '@shared/helpers/currency';
import { useBottomSheet } from '@app/providers/BottomSheetProvider';
import { BillStatus, BillType } from '@features/Bills/types';
import { categoryOptions } from '@features/Bills/static/dropdownOptions';

import {
  changeBillPaymentStatus,
  deleteBill,
  fetchBillDetails,
} from '../stores/historyDetails/historyDetails.thunks';
import {
  selectHistoryBillDetails,
  selectHistoryBillDetailsStatus,
} from '../stores/historyDetails/historyDetails.selectors';
import { mapBillToHistoryBill } from '../mappers/mapBillToHistoryBill';
import { billCardUiState } from '../static/billCardUiState';
import { resetBills } from '../stores/history/history.slice';

type Props = {
  navigation: AppStackNavigationProps;
  route: { params: AppStackParamList[AppRoutes.HISTORY_DETAILS] };
};

function HistoryDetailsView({ navigation, route }: Props) {
  const { billId } = route.params;
  const dispatch = useAppDispatch();
  const { setIsLoading } = useLoading();
  const [styles, theme] = useStyled(createStyles);
  const deleteBillConfirmationSheet = useBottomSheet('deleteBillConfirmation');
  const bill = useAppSelector(selectHistoryBillDetails);
  const status = useAppSelector(selectHistoryBillDetailsStatus);

  const isLoading = status === 'loading';
  const historyBill = bill && mapBillToHistoryBill(bill);

  const { icon, variant } =
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

  const handleChangePaymentStatus = (markAsPaid: boolean) => {
    dispatch(changeBillPaymentStatus({ id: billId, markAsPaid }));
    dispatch(fetchBillDetails(billId));
    dispatch(resetBills());
  };

  const handleEdit = () => {
    if (!bill) {
      return;
    }

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
        <View>
          <View style={styles.header}>
            <View style={styles.descriptionRow}>
              {dataLabel && (
                <Badge icon={icon} text={dataLabel} variant={variant} />
              )}
              <Text style={styles.description}>{bill.description}</Text>
            </View>
            <View>
              <Text style={styles.amount}>
                {currencyFormat(bill.amount ?? 0)}
              </Text>
              {!bill.amount && (
                <Badge
                  icon="triangle-exclamation"
                  text="Valor pendente"
                  variant="warning"
                />
              )}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ações</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.actions}>
              {![
                BillStatus.PAID,
                BillStatus.PAID_TODAY,
                BillStatus.PAID_YESTERDAY,
              ].includes(historyBill?.status ?? BillStatus.UPCOMING) &&
                bill.amount && (
                  <ActionCard
                    icon={{ name: 'circle-check', color: theme.colors.success }}
                    label="Marcar como paga"
                    onPress={() => handleChangePaymentStatus(true)}
                  />
                )}
              <ActionCard
                icon={{ name: 'pen', color: theme.colors.brand }}
                label="Editar"
                onPress={handleEdit}
              />
              <ActionCard
                icon={{ name: 'trash', color: theme.colors.danger }}
                label="Excluir"
                onPress={handleConfirmDelete}
              />
              {[
                BillStatus.PAID,
                BillStatus.PAID_TODAY,
                BillStatus.PAID_YESTERDAY,
              ].includes(historyBill?.status ?? BillStatus.UPCOMING) && (
                <ActionCard
                  icon={{ name: 'circle-xmark', color: theme.colors.danger }}
                  label="Desmarcar como paga"
                  onPress={() => handleChangePaymentStatus(false)}
                />
              )}
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
        <View>
          <View>
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

    return () => {
      setIsLoading(false);
    };
  }, [isLoading]);

  return (
    <SafeAreaView style={styles.safeAreaContainer} edges={['bottom']}>
      {renderContent()}

      <BottomSheet ref={deleteBillConfirmationSheet.ref}>
        {bill && (
          <BottomSheet.DeleteConfirmation
            item="a conta"
            description={bill.description}
            deleteButtonLabel="Sim, excluir conta"
            onClose={deleteBillConfirmationSheet.close}
            onDelete={handleDelete}
          />
        )}
      </BottomSheet>
    </SafeAreaView>
  );
}

function Row({ label, children }: PropsWithChildren<{ label: string }>) {
  const [styles] = useStyled(createStyles);
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{children}</Text>
    </View>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    safeAreaContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    header: {
      gap: theme.spacing(0.5),
      marginBottom: theme.spacing(2),
      paddingHorizontal: theme.spacing(2),
    },

    descriptionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing(1),
    },

    description: {
      fontSize: theme.spacing(3),
      fontWeight: '600',
    },

    amount: {
      fontSize: theme.spacing(4),
      fontWeight: '700',
    },

    section: {
      marginBottom: theme.spacing(3),
      paddingHorizontal: theme.spacing(2),
    },

    sectionTitle: {
      fontSize: theme.spacing(2),
      fontWeight: '600',
      marginBottom: theme.spacing(1.5),
    },

    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(1),
    },
    label: {
      fontSize: 14,
      color: theme.colors.textSecondary,
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
      marginBottom: theme.spacing(2),

      gap: theme.spacing(2),
    },
  });

export default HistoryDetailsView;
