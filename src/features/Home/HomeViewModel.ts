import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import { Bill } from '@features/Bills/types/Bill';
import { useLoading } from '@core/providers/LoadingProvider';

function useHomeViewModel() {
  const [groupedBills, setGroupedBills] = useState<Record<string, Bill[]>>({});
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [hasBills, setHasBills] = useState<boolean>(false);

  const { setIsLoading } = useLoading();

  const markAsPaid = useCallback(async (id: string, paymentDate: string) => {
    setIsLoading(true);
    try {
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      const loadBills = async () => {
        setIsLoading(true);
        try {
          // const { unpaidBills, unpaidTotalAmount } =
          //   await billRepository.getHomeBills();

          const unpaidBills = {};
          const unpaidTotalAmount = 0;

          console.log('unpaidBills', unpaidBills);

          setHasBills(Object.keys(unpaidBills).length !== 0);
          setGroupedBills(unpaidBills);
          setTotalAmount(unpaidTotalAmount);
        } finally {
          setIsLoading(false);
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
