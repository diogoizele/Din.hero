import { useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { differenceInDays, setDate } from 'date-fns';

import { useAppDispatch, useAppSelector } from '@core/hooks';
import { getOnlyDatePart, storageToAppDate } from '@core/helpers/date';
import { BillType } from '@features/Bills/types';
import { RecurringRule } from '@features/RecurringRules/types/RecurringRule';

import { selectHomeRecurringRules } from '../stores/recurringRules/recurringRules.selector';
import {
  fetchRecurringRules,
  generateNextBillByRecurringRule,
} from '../stores/recurringRules/recurringRules.thunks';
import { fetchMonthlyBills } from '../stores/home/home.thunks';
import {
  canRunDailyGeneration,
  markDailyGenerationAsDone,
} from '../services/dailyGenerationService';

const is30DaysLater = (startDate: string, compareDate: Date) =>
  differenceInDays(compareDate, storageToAppDate(startDate)) >= 30;

export function useRecurringBillGenerator() {
  const dispatch = useAppDispatch();
  const rules = useAppSelector(selectHomeRecurringRules);

  function createBillIfPending(recurringRule: RecurringRule) {
    const today = new Date();
    const dueDate = getOnlyDatePart(setDate(today, recurringRule.dayOfMonth));

    if (recurringRule.lastGeneratedAt) {
      if (is30DaysLater(recurringRule.lastGeneratedAt, today)) {
        if (!recurringRule.active) {
          return;
        }

        dispatch(
          generateNextBillByRecurringRule({
            recurringRuleId: recurringRule.id,
            amount: recurringRule.fixedAmount,
            billType: BillType.RECURRING,
            category: recurringRule.category,
            dueDate,
            paymentDate: null,
            description: recurringRule.description,
            notes: recurringRule.notes,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            installment: null,
          }),
        );
        dispatch(fetchMonthlyBills());
      }
    }
  }

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchRecurringRules());
    }, []),
  );

  useEffect(() => {
    (async () => {
      const canGenerate = await canRunDailyGeneration();

      if (!canGenerate) {
        return;
      }

      rules.forEach(rule => {
        createBillIfPending(rule);
      });

      await markDailyGenerationAsDone();
    })();
  }, [rules]);
}
