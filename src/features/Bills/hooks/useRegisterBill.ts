import { UseFormClearErrors } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import { useLoading } from '@core/providers/LoadingProvider';
import { currencyParse } from '@core/helpers/currency';
import { AppRoutes } from '@core/navigation/PrivateStackNavigator.types';

import { BillForm } from './useBillForm';
import { BillType } from '../types';
import {
  billFormToPayload,
  billInstallmentFormToPayload,
  recurringRuleToPayload,
} from '../mappers/billFormToPayload';
import * as billService from '../services/billsService';

type OnSubmitArgs = {
  clearErrors: UseFormClearErrors<BillForm>;
  handleValidate: (data: BillForm) => boolean;
};

export function useRegisterBill() {
  const { setIsLoading } = useLoading();
  const navigation = useNavigation();

  const onSubmit = async (
    data: BillForm,
    { clearErrors, handleValidate }: OnSubmitArgs,
  ) => {
    clearErrors();

    if (!handleValidate(data)) {
      return;
    }

    setIsLoading(true);
    try {
      if (data.billType === BillType.ONE_TIME) {
        const payload = billFormToPayload(data);

        await billService.addBill(payload);
      } else if (data.billType === BillType.INSTALLMENT) {
        const promises = Array.from({ length: data.installments! }, (_, i) => {
          const dueDate = new Date(data.dueDate);
          dueDate.setMonth(dueDate.getMonth() + i);

          const amount = currencyParse(data.amount)! / data.installments!;

          const billData = {
            ...data,
            dueDate,
            amount,
          };

          return billService.addBill(
            billInstallmentFormToPayload(billData, {
              current: i + 1,
              total: Number(data.installments!),
            }),
          );
        });

        await Promise.all(promises);
      } else {
        const bill = billFormToPayload({ ...data, isPaidOnCreation: false });
        const recurringRule = recurringRuleToPayload(data);

        await billService.addRecurringRuleAndBill(recurringRule, bill);
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
