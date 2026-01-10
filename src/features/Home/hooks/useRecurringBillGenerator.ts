import { useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { differenceInDays, setDate } from 'date-fns';

import { useAppDispatch, useAppSelector } from '@core/hooks';
import { getOnlyDatePart, now, parseAppDate } from '@core/helpers/date';
import { BillType, RecurringRule } from '@features/Bills/types';

import { selectHomeRecurringRules } from '../stores/recurringRules/recurringRules.selector';
import {
  fetchRecurringRules,
  generateNextBillByRecurringRule,
} from '../stores/recurringRules/recurringRules.thunks';
import { fetchMonthlyBills } from '../stores/home/home.thunks';

const is30DaysLater = (startDate: string, compareDate: string) =>
  differenceInDays(
    getOnlyDatePart(parseAppDate(compareDate)),
    getOnlyDatePart(parseAppDate(startDate)),
  ) >= 30;

export function useRecurringBillGenerator() {
  const dispatch = useAppDispatch();
  const rules = useAppSelector(selectHomeRecurringRules);

  function createBillIfPending(recurringRule: RecurringRule) {
    const nowDate = getOnlyDatePart(now());
    const dueDate = getOnlyDatePart(setDate(nowDate, recurringRule.dayOfMonth));

    if (recurringRule.lastGeneratedAt) {
      if (is30DaysLater(recurringRule.lastGeneratedAt, nowDate)) {
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
    rules.forEach(rule => {
      createBillIfPending(rule);
    });
  }, [rules]);
}
