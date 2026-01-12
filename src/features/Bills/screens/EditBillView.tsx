import React from 'react';

import {
  AppRoutes,
  AppStackParamList,
} from '@core/navigation/PrivateStackNavigator.types';
import { BillFormComponent } from '@features/Bills/components';

import { useEditBill } from '../hooks/useEditBill';
import { currencyFormat } from '../../../core/helpers/currency';
import { BillType } from '../types';
import { parseAppDate } from '../../../core/helpers/date';

type Props = {
  route: { params: AppStackParamList[AppRoutes.BILLS_EDIT] };
};

function EditBillView({ route }: Props) {
  const { bill } = route.params;
  const { onSubmit } = useEditBill({
    billId: bill.id,
    billType: bill.billType,
  });
  
  return (
    <BillFormComponent
      title="Editar Conta"
      submitLabel="Salvar"
      isEdition
      defaultValues={{
        billType: bill.billType,
        description: bill.description,
        amount: bill.amount ? currencyFormat(bill.amount) : '',
        category: bill.category,
        dueDate: parseAppDate(bill.dueDate),
        installments: bill.installment?.total,
        notes: bill.notes,
        isPaidOnCreation: Boolean(bill.paymentDate),
        isRecurrentFixedAmount:
          bill.billType === BillType.RECURRING && Boolean(bill.amount),
      }}
      onSubmit={onSubmit}
    />
  );
}

export default EditBillView;
