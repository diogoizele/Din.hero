import { useNavigation } from '@react-navigation/native';

import { useLoading } from '@app/providers/LoadingProvider';
import { AppRoutes } from '@app/navigation/AppStackNavigator.types';
import { currencyParse } from '@shared/helpers/currency';
import { localDateString } from '@shared/helpers/date';

import { BillForm } from './useBillForm';
import { BillType } from '../types';
import { toDomain } from '../mappers/billsMapper';
import { BillsService } from '../services/billsService';
import { useQueryClient } from '@tanstack/react-query';
import { useUser } from '../../Auth';

export function useRegisterBill() {
  const user = useUser();
  const { setIsLoading } = useLoading();
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const onSubmit = async (data: BillForm) => {
    setIsLoading(true);

    console.log({ formData: data });

    const bill = toDomain(data);

    try {
      if (
        data.billType === BillType.INSTALLMENT &&
        data.installments !== null
      ) {
        const total = Number(data.installments);
        const installment = currencyParse(data.amount)! / total;

        const promises = Array.from({ length: total }, (_, i) => {
          const dueDate = new Date(data.dueDate);
          dueDate.setMonth(dueDate.getMonth() + i);

          return BillsService.create({
            ...bill,
            amount: installment,
            dueDate: localDateString(dueDate),
            installment: {
              current: i + 1,
              total,
            },
          });
        });

        await Promise.all(promises);
      } else {
        await BillsService.create(bill, data.billType === BillType.RECURRING);
      }

      queryClient.invalidateQueries({
        queryKey: ['upcoming-bills-in-30-days', user?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ['home/summary', user?.id],
      });

      navigation.reset({
        index: 0,
        routes: [{ name: AppRoutes.HOME }],
      });
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
