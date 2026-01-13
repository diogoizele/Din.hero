import { useNavigation } from '@react-navigation/native';

import { useLoading } from '@core/providers/LoadingProvider';
import { useAppDispatch } from '@core/hooks';
import { BillForm } from '@features/Bills/hooks/useBillForm';

import * as recurringRuleService from '../services/recurringRulesService';
import { resetRecurringRulesState } from '../stores/recurringRules.slice';
import { billFormToRecurringRulePayload } from '../mappers/billFormToRecurringRulePayload';

type Props = {
  recurringRuleId: string;
};

export function useEditRecurringRule({ recurringRuleId }: Props) {
  const { setIsLoading } = useLoading();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: BillForm) => {
    setIsLoading(true);
    try {
      const payload = billFormToRecurringRulePayload(data);

      await recurringRuleService.updateRecurringRule(recurringRuleId, {
        description: payload.description,
        fixedAmount: payload.fixedAmount,
        category: payload.category,
        startDate: payload.startDate,
        notes: payload.notes,
        dayOfMonth: payload.dayOfMonth,
      });

      dispatch(resetRecurringRulesState());
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao editar regra recorrente:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    onSubmit,
  };
}
