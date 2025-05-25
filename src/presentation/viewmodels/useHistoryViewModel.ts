import useBillsStore from '../../shared/store/BillsStore';
import { billsRepository } from '../../shared/di';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useMemo } from 'react';
import useAppStore from '../../shared/store/AppStore';

function useHistoryViewModel() {
  const billsStore = useBillsStore();
  const { setLoading } = useAppStore();

  const sortedBills = useMemo(
    () =>
      billsStore.bills.sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
      ),
    [billsStore.bills],
  );

  useFocusEffect(
    useCallback(() => {
      const loadBills = async () => {
        setLoading(true);
        try {
          const allBills = await billsRepository.getAll();
          billsStore.setBills(allBills);
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
