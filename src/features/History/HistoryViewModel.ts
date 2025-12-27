import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useMemo, useState } from 'react';

import { billRepository } from '@data/repositories/BillRepository';
import { Bill } from '@features/Bills/types/Bill';
import { useLoading } from '@core/providers/LoadingProvider';

function useHistoryViewModel() {
  const { setIsLoading } = useLoading();

  const [bills, setBills] = useState<Bill[]>([]);

  const sortedBills = useMemo(
    () =>
      bills.sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
      ),
    [bills],
  );

  useFocusEffect(
    useCallback(() => {
      const loadBills = async () => {
        setIsLoading(true);
        try {
          const allBills = await billRepository.getAllBills();
          setBills(allBills);
        } finally {
          setIsLoading(false);
        }
      };

      loadBills();
    }, []),
  );

  return {
    sortedBills,
  };
}

export default useHistoryViewModel;
