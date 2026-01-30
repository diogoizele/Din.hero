import { useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { addMonths, setDate } from 'date-fns';

import { useAppDispatch, useAppSelector } from '@core/hooks';
import { getOnlyDatePart } from '@core/helpers/date';
import { BillType, Bill } from '@features/Bills/types';
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
import { selectBills } from '../stores/home/home.selectors';

function getNextDueDate(rule: RecurringRule, today: Date): Date {
  const thisMonth = setDate(today, rule.dayOfMonth);
  if (thisMonth >= today) {
    return thisMonth;
  }
  return setDate(addMonths(today, 1), rule.dayOfMonth);
}

export function useRecurringBillGenerator() {
  const dispatch = useAppDispatch();
  const rules = useAppSelector(selectHomeRecurringRules);
  const bills = useAppSelector(selectBills);

  function createBillIfPending(recurringRule: RecurringRule, allBills: Bill[]) {
    if (!recurringRule.active) {
      return;
    }

    const today = new Date();
    const nextDueDate = getNextDueDate(recurringRule, today);
    const nextDueDateStr = getOnlyDatePart(nextDueDate);

    if (
      recurringRule.endDate &&
      getOnlyDatePart(recurringRule.endDate) < nextDueDateStr
    ) {
      return;
    }

    const alreadyExists = allBills.some(bill => {
      if (bill.recurringRuleId !== recurringRule.id) {
        return false;
      }
      const billDue = getOnlyDatePart(bill.dueDate);
      return billDue === nextDueDateStr;
    });

    if (alreadyExists) {
      return;
    }

    dispatch(
      generateNextBillByRecurringRule({
        recurringRuleId: recurringRule.id,
        amount: recurringRule.fixedAmount,
        billType: BillType.RECURRING,
        category: recurringRule.category,
        dueDate: nextDueDateStr,
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

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchRecurringRules());
      dispatch(fetchMonthlyBills());
    }, [dispatch]),
  );

  useEffect(() => {
    (async () => {
      const canGenerate = await canRunDailyGeneration();

      if (!canGenerate) {
        return;
      }

      rules.forEach(rule => {
        createBillIfPending(rule, bills);
      });

      await markDailyGenerationAsDone();
    })();
  }, [rules, bills]);
}
