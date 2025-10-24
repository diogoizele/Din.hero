import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useMemo, useState } from 'react';

import useAppStore from '../../store/AppStore';
import { billRepository } from '../../data/repositories/BillRepository';
import { Bill } from '../../domain/Bill';

function useHistoryViewModel() {
  const { setLoading } = useAppStore();

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
        setLoading(true);
        try {
          const allBills = await billRepository.getAllBills();
          setBills(allBills);
        } finally {
          setLoading(false);
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
