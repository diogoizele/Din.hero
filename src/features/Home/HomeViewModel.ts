import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import { billRepository } from '../../data/repositories/BillRepository';
import useAppStore from '../../data/store/AppStore';
import { Bill } from '../../data/models/Bill';

function useHomeViewModel() {
  const [groupedBills, setGroupedBills] = useState<Record<string, Bill[]>>({});
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [hasBills, setHasBills] = useState<boolean>(false);

  const { setLoading } = useAppStore();

  const markAsPaid = useCallback(
    async (id: string, paymentDate: string) => {
      setLoading(true);
      try {
        await billRepository.markAsPaid(id, paymentDate);
      } finally {
        setLoading(false);
      }
    },
    [setLoading],
  );

  useFocusEffect(
    useCallback(() => {
      const loadBills = async () => {
        setLoading(true);
        try {
          const { unpaidBills, unpaidTotalAmount } =
            await billRepository.getHomeBills();

          console.log('unpaidBills', unpaidBills);

          setHasBills(Object.keys(unpaidBills).length !== 0);
          setGroupedBills(unpaidBills);
          setTotalAmount(unpaidTotalAmount);
        } finally {
          setLoading(false);
        }
      };

      console.log('Fui chamado!');
      console.log('P{AA');

      loadBills();
    }, []),
  );

  return {
    groupedBills,
    totalAmount,
    hasBills,
    markAsPaid,
  };
}

export default useHomeViewModel;
