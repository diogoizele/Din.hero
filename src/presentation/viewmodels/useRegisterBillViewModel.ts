import { useNavigation } from '@react-navigation/native';

import useBillsStore from '../../shared/store/BillsStore';
import { billsRepository } from '../../shared/di';
import useAppStore from '../../shared/store/AppStore';
import { currencyParse } from '../../shared/helpers/currency';
import { Frequency } from '../../domain/models/Frequency';
import { useForm } from 'react-hook-form';
import { Bill } from '../../domain/models/Bill';
import { generateId } from '../../shared/helpers/id';

type RegisterBillForm = {
  description: string;
  amount: string;
  dueDate: Date;
  category?: string;
  frequency?: Frequency;
  notes?: string;
  isRecurrent: boolean;
};

type FormErrors = {
  description?: { message: string };
  amount?: { message: string };
  dueDate?: { message: string };
  frequency?: { message: string };
};

function useRegisterBillViewModel() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    setError,
  } = useForm<RegisterBillForm>();

  const { goBack } = useNavigation();

  const isRecurrent = watch('isRecurrent');

  const dueDatePlaceholder = isRecurrent
    ? 'Dia do primeiro vencimento'
    : 'Data de vencimento';

  const billsStore = useBillsStore();
  const { setLoading } = useAppStore();

  async function addBill(bill: Bill) {
    setLoading(true);
    try {
      await billsRepository.save(bill);
      billsStore.addBill(bill);
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = (data: RegisterBillForm) => {
    clearErrors();

    if (!handleValidate(data)) {
      return;
    }

    addBill({
      id: generateId(),
      amount: currencyParse(data.amount),
      description: data.description,
      dueDate: data.dueDate.toISOString(),
      category: data.category,
      frequency: data.frequency,
      notes: data.notes,
      paid: false,
    });

    goBack();
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
      setValue('frequency', undefined);
    }
  };

  return {
    control,
    errors,
    dueDatePlaceholder,
    isRecurrent,
    goBack,
    handleClearFrequency,
    handleSubmit: handleSubmit(onSubmit),
  };
}

export default useRegisterBillViewModel;
