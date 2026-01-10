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

type Props = {
  billId: string;
};

type OnSubmitArgs = {
  clearErrors: UseFormClearErrors<BillForm>;
  handleValidate: (data: BillForm) => boolean;
};

export function useEditBill({ billId }: Props) {
  const { setIsLoading } = useLoading();
  const navigation = useNavigation();

  const onSubmit = async (
    data: BillForm,
    { clearErrors, handleValidate }: OnSubmitArgs,
  ) => {
    clearErrors();

    console.log({ editData: data });

    if (!handleValidate(data)) {
      return;
    }

    setIsLoading(true);
    try {
      if (data.billType === BillType.ONE_TIME) {
        const payload = billFormToPayload(data);

        await billService.updateBill(billId, payload);
      } else if (data.billType === BillType.INSTALLMENT) {
        
      }

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
