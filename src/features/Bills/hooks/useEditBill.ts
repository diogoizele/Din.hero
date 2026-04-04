import { useNavigation } from '@react-navigation/native';

import { useLoading } from '@app/providers/LoadingProvider';
import { useAppDispatch } from '@shared/hooks';
import { resetBills } from '@features/History/stores/history/history.slice';

import { BillType } from '../types';
import { toDomain } from '../mappers/billsMapper';
import { BillsService } from '../services/billsService';
import { BillForm } from './useBillForm';

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

    const bill = toDomain(data);

    try {
      if ([BillType.RECURRING, BillType.ONE_TIME].includes(billType)) {
        await BillsService.update(billId, {
          amount: bill.amount,
          category: bill.category,
          description: bill.description,
          dueDate: billType === BillType.INSTALLMENT ? undefined : bill.dueDate,
          notes: bill.notes,
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
