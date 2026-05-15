import { useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { createBillIfPendingFirebase } from '@features/Bills/services/billsSource.firebase';
import { useAppDispatch, useAppSelector } from '@shared/hooks';

import { selectHomeRecurringRules } from '../stores/recurringRules/recurringRules.selector';
import { fetchRecurringRules } from '../stores/recurringRules/recurringRules.thunks';
import { fetchMonthlyBills } from '../stores/home/home.thunks';
import { HomeService } from '../services/homeService';

export function useRecurringBillGenerator() {
  const dispatch = useAppDispatch();
  const rules = useAppSelector(selectHomeRecurringRules);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchRecurringRules());
      dispatch(fetchMonthlyBills());
    }, [dispatch]),
  );

  useEffect(() => {
    (async () => {
      const canGenerate = await HomeService.canRunDailyGeneration();

      if (!canGenerate) {
        return;
      }

      await Promise.all([
        ...rules.map(rule => createBillIfPendingFirebase(rule.id)),
      ]);

      dispatch(fetchMonthlyBills());

      await HomeService.markDailyGenerationAsDone();
    })();
  }, [rules]);
}
