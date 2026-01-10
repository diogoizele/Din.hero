import React from 'react';

import {
  AppRoutes,
  AppStackParamList,
} from '@core/navigation/PrivateStackNavigator.types';
import { BillFormComponent } from '@features/Bills/components';

import { useEditBill } from '../hooks/useEditBill';
import { currencyFormat } from '../../../core/helpers/currency';

type Props = {
  route: { params: AppStackParamList[AppRoutes.BILLS_EDIT] };
};

function EditBillView({ route }: Props) {
  const { bill } = route.params;
  const { onSubmit } = useEditBill({ billId: bill.id });

  return (
    <BillFormComponent
      title="Editar Conta"
      submitLabel="Salvar"
      defaultValues={{
        billType: bill.billType,
        description: bill.description,
        amount: currencyFormat(bill.amount ?? 0),
        category: bill.category,
        dueDate: new Date(bill.dueDate),
        installments: bill.installment?.total,
        notes: bill.notes,
        isPaidOnCreation: Boolean(bill.paymentDate),
      }}
      onSubmit={onSubmit}
    />
  );
}

export default EditBillView;
