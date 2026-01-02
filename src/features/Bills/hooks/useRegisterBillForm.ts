import { useEffect } from 'react';
import { Control, FieldErrors, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import { useLoading } from '@core/providers/LoadingProvider';
import { BillType, Category } from '@features/Bills/types';
import * as billService from '../services/billsService';
import { AppRoutes } from '../../../core/navigation/PrivateStackNavigator.types';
import {
  billFormToPayload,
  billInstallmentFormToPayload,
  recurringRuleToPayload,
} from '../mappers/billFormToPayload';
import { currencyParse } from '../../../core/helpers/currency';

export type RegisterBillForm = {
  description: string;
  amount: string;
  dueDate: Date;
  category: Category | null;
  notes: string | null;
  billType: BillType;
  installments: number | null;
  isRecurrentFixedAmount: boolean;
  isPaidOnCreation: boolean;
};

type FormErrors = {
  description?: { message: string };
  amount?: { message: string };
  dueDate?: { message: string };
  installments?: { message: string };
};

export type RegisterBillFormControl = Control<RegisterBillForm>;
export type RegisterBillFormErrors = FieldErrors<RegisterBillForm>;

export function useRegisterBillForm() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    setError,
    reset,
  } = useForm<RegisterBillForm>({
    defaultValues: {
      isRecurrentFixedAmount: true,
      isPaidOnCreation: true,
    },
  });
  const { setIsLoading } = useLoading();
  const navigation = useNavigation();

  const billType = watch('billType');
  const isRecurrentFixedAmount = watch('isRecurrentFixedAmount');
  const isPaidOnCreation = watch('isPaidOnCreation');
  const installments = watch('installments');
  const amount = watch('amount');

  const onSubmit = async (data: RegisterBillForm) => {
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

      navigation.navigate(AppRoutes.HOME);
    } catch (error) {
      console.error('Erro ao registrar conta:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleValidate = (data: RegisterBillForm) => {
    const fieldErrors: FormErrors = {};

    const { billType } = data;

    if (!data.description) {
      fieldErrors.description = { message: 'Descrição é obrigatória' };
    }

    if (!data.amount) {
      if (
        [BillType.ONE_TIME, BillType.INSTALLMENT].includes(billType) ||
        (billType === BillType.RECURRING && data.isRecurrentFixedAmount)
      ) {
        fieldErrors.amount = { message: 'Valor é obrigatório' };
      }
    }

    if (
      !data.dueDate &&
      ((!isPaidOnCreation && billType === BillType.ONE_TIME) ||
        billType !== BillType.ONE_TIME)
    ) {
      fieldErrors.dueDate = { message: 'Data de vencimento é obrigatória' };
    }

    if (!data.installments && billType === BillType.INSTALLMENT) {
      fieldErrors.installments = {
        message: 'Número de parcelas é obrigatório',
      };
    }

    if (data.installments && data.installments <= 1) {
      fieldErrors.installments = {
        message: 'Número de parcelas deve ser maior que 1',
      };
    }

    const errorsList = Object.entries(fieldErrors);

    errorsList.forEach(([field, error]) => {
      setError(field as keyof RegisterBillForm, error);
    });

    return errorsList.length === 0;
  };

  useEffect(() => {
    reset({
      billType,
      isRecurrentFixedAmount: true,
      isPaidOnCreation: true,
    });
  }, [billType, reset]);

  return {
    control,
    errors,
    billType,
    isRecurrentFixedAmount,
    isPaidOnCreation,
    installments,
    amount,
    handleSubmit: handleSubmit(onSubmit),
  };
}
