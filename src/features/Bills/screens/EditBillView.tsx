import React, { useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';

import {
  AppRoutes,
  AppStackParamList,
} from '@core/navigation/PrivateStackNavigator.types';
import { BillFormComponent, BottomSheet, Header } from '@core/components';
import { currencyFormat } from '@core/helpers/currency';
import {
  BillFormComponentRef,
  BillFormModes,
} from '@core/components/BillFormComponent';
import { dateOnlyToLocalDate } from '@core/helpers/date';
import { useBottomSheet } from '@core/providers/BottomSheetProvider';

import { useEditBill } from '../hooks/useEditBill';
import { BillType } from '../types';
import { ConfirmExitSheet } from '../components/ConfirmExitSheet';

type Props = {
  route: { params: AppStackParamList[AppRoutes.BILLS_EDIT] };
};

function EditBillView({ route }: Props) {
  const { bill } = route.params;
  const formRef = useRef<BillFormComponentRef>(null);

  const navigation = useNavigation();
  const confirmExitSheet = useBottomSheet('confirmExitEditBill');
  const { onSubmit } = useEditBill({
    billId: bill.id,
    billType: bill.billType,
  });

  const handleTryGoBack = () => {
    formRef.current?.onFormDirty(isDirty => {
      if (!isDirty) {
        return navigation.goBack();
      } else {
        confirmExitSheet.open();
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Editar Conta" onBackPress={handleTryGoBack} />
      <BillFormComponent
        ref={formRef}
        submitLabel="Salvar"
        mode={BillFormModes.EDIT_BILL}
        defaultValues={{
          billType: bill.billType,
          description: bill.description,
          amount: bill.amount ? currencyFormat(bill.amount) : '',
          category: bill.category,
          dueDate: dateOnlyToLocalDate(bill.dueDate),
          installments: bill.installment?.total,
          notes: bill.notes,
          isPaidOnCreation: Boolean(bill.paymentDate),
          isRecurrentFixedAmount:
            bill.billType === BillType.RECURRING && Boolean(bill.amount),
        }}
        onSubmit={onSubmit}
      />
      <BottomSheet ref={confirmExitSheet.ref}>
        <ConfirmExitSheet
          title="Abandonar edição?"
          description="Você fez alterações nesta conta de pagamentos. Se sair agora, todas as informações preenchidas serão perdidas."
          emphasis="Esta ação não pode ser desfeita!"
          primaryAction={{
            label: 'Continuar',
            mode: 'outlined',
            onPress: confirmExitSheet.close,
          }}
          secondaryAction={{
            label: 'Sair sem editar',
            onPress: navigation.goBack,
          }}
        />
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
export default EditBillView;
