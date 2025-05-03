import { useEffect, useMemo, useState } from 'react';

import type { Bill } from '../types/bill.types';
import { bills } from './mocks/bills';
import { parseISO } from 'date-fns';

const fakeRequest = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(bills);
    }, 1000);
  });
};

const useBills = () => {
  const [bills, setBills] = useState<Bill[]>([]);

  const totalAmount = useMemo(() => {
    return bills.reduce((acc, bill) => {
      if (bill.paid) {
        return acc;
      }
      return acc + bill.amount;
    }, 0);
  }, [bills]);

  const groupedBills = useMemo(() => {
    return Object.entries(
      bills.reduce<Record<string, Bill[]>>((acc, bill) => {
        const dateKey = parseISO(bill.dueDate).toISOString().split('T')[0];
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(bill);
        return acc;
      }, {}),
    );
  }, [bills]);

  const addBill = (bill: Bill) => {
    setBills(prevBills => [...prevBills, bill]);
  };

  const updateBill = (updatedBill: Bill) => {
    setBills(prevBills =>
      prevBills.map(bill => (bill.id === updatedBill.id ? updatedBill : bill)),
    );
  };

  const deleteBill = (id: string) => {
    setBills(prevBills => prevBills.filter(bill => bill.id !== id));
  };

  useEffect(() => {
    const fetchBills = async () => {
      const billsData = await fakeRequest();
      setBills(billsData as Bill[]);
    };

    fetchBills();
  }, []);

  return {
    bills,
    groupedBills,
    totalAmount,
    addBill,
    updateBill,
    deleteBill,
  };
};

export default useBills;
