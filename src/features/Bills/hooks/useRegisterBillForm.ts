import { Control, FieldErrors, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import { currencyParse } from '@core/helpers/currency';
import { useLoading } from '@core/providers/LoadingProvider';
import { BillType, Category, Frequency } from '@features/Bills/types';
import * as billService from '../services/billsService';
import { AppRoutes } from '../../../core/navigation/PrivateStackNavigator.types';

type RegisterBillForm = {
  description: string;
  amount: string;
  dueDate: Date;
  category: Category | null;
  frequency: Frequency | null;
  notes: string | null;
  isRecurrent: boolean;
  billType: BillType;
  installments: number | null;
  isRecurrentFixedAmount: boolean;
};

type FormErrors = {
  description?: { message: string };
  amount?: { message: string };
  dueDate?: { message: string };
  frequency?: { message: string };
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
  } = useForm<RegisterBillForm>({
    defaultValues: {
      isRecurrentFixedAmount: true,
    },
  });
  const { setIsLoading } = useLoading();
  const navigation = useNavigation();

  const isRecurrent = watch('isRecurrent');
  const billType = watch('billType');
  const isRecurrentFixedAmount = watch('isRecurrentFixedAmount');

  const dueDatePlaceholder = isRecurrent
    ? 'Dia do primeiro vencimento'
    : 'Data de vencimento';

  const onSubmit = async (data: RegisterBillForm) => {
    clearErrors();

    if (!handleValidate(data)) {
      return;
    }

    setIsLoading(true);
    try {
      await billService.add({
        installment: null,
        amount: currencyParse(data.amount),
        description: data.description,
        dueDate: data.dueDate.toISOString(),
        category: data.category,
        frequency: data.frequency,
        notes: data.notes,
        paymentDate: null,
        recurringRuleId: null,
      });
      navigation.navigate(AppRoutes.HOME);
    } catch (error) {
      console.error('Erro ao registrar conta:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleValidate = (data: RegisterBillForm) => {
    const fieldErrors: FormErrors = {};

    if (!data.description) {
      fieldErrors.description = { message: 'Descrição é obrigatória' };
    }

    if (!data.amount) {
      fieldErrors.amount = { message: 'Valor é obrigatório' };
    }

    if (data.isRecurrent && !data.frequency) {
      fieldErrors.frequency = { message: 'Frequência é obrigatória' };
    }

    if (!data.dueDate) {
      fieldErrors.dueDate = { message: 'Data de vencimento é obrigatória' };
    }

    const errorsList = Object.entries(fieldErrors);

    errorsList.forEach(([field, error]) => {
      setError(field as keyof RegisterBillForm, error);
    });

    return errorsList.length === 0;
  };

  const handleClearFrequency = () => {
    if (!isRecurrent) {
      setValue('frequency', null);
    }
  };

  return {
    control,
    errors,
    dueDatePlaceholder,
    isRecurrent,
    billType,
    isRecurrentFixedAmount,
    handleClearFrequency,
    handleSubmit: handleSubmit(onSubmit),
  };
}
