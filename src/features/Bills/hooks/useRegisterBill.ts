import { useNavigation } from '@react-navigation/native';

import { useLoading } from '@app/providers/LoadingProvider';
import { AppRoutes } from '@app/navigation/PrivateStackNavigator.types';
import { currencyParse } from '@shared/helpers/currency';
import { localDateString } from '@shared/helpers/date';

import { BillForm } from './useBillForm';
import { BillType } from '../types';
import { toDomain } from '../mappers/billsMapper';
import { BillsService } from '../services/billsService';

export function useRegisterBill() {
  const { setIsLoading } = useLoading();
  const navigation = useNavigation();

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
