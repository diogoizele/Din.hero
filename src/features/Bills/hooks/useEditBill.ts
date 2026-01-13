import { useNavigation } from '@react-navigation/native';

import { useLoading } from '@core/providers/LoadingProvider';
import { useAppDispatch } from '@core/hooks';
import { resetBills } from '@features/History/stores/history/history.slice';

import { BillForm } from './useBillForm';
import { BillType } from '../types';
import {
  billFormToPayload,
  billInstallmentFormToPayload,
} from '../mappers/billFormToPayload';
import * as billService from '../services/billsService';

type Props = {
  billId: string;
  billType: BillType;
};

export function useEditBill({ billId, billType }: Props) {
  const { setIsLoading } = useLoading();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: BillForm) => {
    setIsLoading(true);
    try {
      if ([BillType.RECURRING, BillType.ONE_TIME].includes(billType)) {
        const payload = billFormToPayload(data);

        await billService.updateBill(billId, {
          amount: payload.amount,
          category: payload.category,
          description: payload.description,
          dueDate: payload.dueDate,
          notes: payload.notes,
        });
      } else if (billType === BillType.INSTALLMENT) {
        const payload = billInstallmentFormToPayload(data, {
          current: 1,
          total: data.installments!,
        });

        await billService.updateBill(billId, {
          amount: payload.amount,
          category: payload.category,
          description: payload.description,
          notes: payload.notes,
        });
      }

      dispatch(resetBills());
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao registrar conta:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    onSubmit,
  };
}
