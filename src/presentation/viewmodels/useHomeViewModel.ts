import useBillsStore from '../../shared/store/BillsStore';
import { billsRepository } from '../../shared/di';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useMemo } from 'react';
import useAppStore from '../../shared/store/AppStore';

function useHomeViewModel() {
  const billsStore = useBillsStore();
  const { setLoading } = useAppStore();

  const pendingBills = useMemo(
    () => billsStore.bills.filter(bill => !bill.paid),
    [billsStore.bills],
  );
  const sortedBills = useMemo(
    () =>
      pendingBills.sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
      ),
    [pendingBills],
  );

  const groupedBills = useMemo(() => {
    return Object.entries(
      sortedBills.reduce<Record<string, any[]>>((acc, bill) => {
        const dateKey = bill.dueDate.split('T')[0];
        (acc[dateKey] ||= []).push(bill);
        return acc;
      }, {}),
    );
  }, [sortedBills]);

  const totalAmount = useMemo(
    () => pendingBills.reduce((sum, bill) => sum + bill.amount, 0),
    [pendingBills],
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

  const markAsPaid = useCallback(
    async (id: string, paymentDate: string) => {
      setLoading(true);
      try {
        await billsRepository.markAsPaid(id, paymentDate);
        billsStore.markAsPaid(id, paymentDate);
      } finally {
        setLoading(false);
      }
    },
    [billsStore.setBills, setLoading],
  );

  return {
    groupedBills,
    totalAmount,
    markAsPaid,
  };
}

export default useHomeViewModel;
