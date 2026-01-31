import { useEffect } from 'react';
import { Control, FieldErrors, useForm } from 'react-hook-form';

import { BillType, Category } from '@features/Bills/types';

export type BillForm = {
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

export type BillFormControl = Control<BillForm>;
export type BillFormErrors = FieldErrors<BillForm>;

export type Props = {
  defaultValues?: Partial<BillForm>;
};

export function useBillForm(args?: Props) {
  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
    watch,
    clearErrors,
    setError,
    setValue,
  } = useForm<BillForm>({
    defaultValues: {
      isRecurrentFixedAmount:
        args?.defaultValues?.isRecurrentFixedAmount ?? true,
      isPaidOnCreation: args?.defaultValues?.isPaidOnCreation ?? false,
      ...args?.defaultValues,
      installments: args?.defaultValues?.installments ?? null,
    },
  });

  const billType = watch('billType');
  const isRecurrentFixedAmount = watch('isRecurrentFixedAmount');
  const isPaidOnCreation = watch('isPaidOnCreation');
  const installments = watch('installments');
  const amount = watch('amount');

  const validate = (data: BillForm) => {
    clearErrors();

    const fieldErrors: FormErrors = {};

    const type = data.billType;

    if (!data.description) {
      fieldErrors.description = { message: 'Descrição é obrigatória' };
    }

    if (!data.amount) {
      if (
        [BillType.ONE_TIME, BillType.INSTALLMENT].includes(type) ||
        (type === BillType.RECURRING && data.isRecurrentFixedAmount)
      ) {
        fieldErrors.amount = { message: 'Valor é obrigatório' };
      }
    }

    if (
      !data.dueDate &&
      ((!isPaidOnCreation && type === BillType.ONE_TIME) ||
        type !== BillType.ONE_TIME)
    ) {
      fieldErrors.dueDate = { message: 'Data de vencimento é obrigatória' };
    }

    if (!data.installments && type === BillType.INSTALLMENT) {
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
      setError(field as keyof BillForm, error);
    });

    return errorsList.length === 0;
  };

  useEffect(() => {
    if (!isRecurrentFixedAmount && billType === BillType.RECURRING) {
      clearErrors('amount');
      setValue('amount', '');
    }
  }, [isRecurrentFixedAmount]);

  return {
    control,
    errors,
    isDirty,
    billType,
    isRecurrentFixedAmount,
    isPaidOnCreation,
    installments,
    amount,
    handleSubmit,
    validate,
    clearErrors,
  };
}
