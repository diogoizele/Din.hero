import { useCallback, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parseISO } from 'date-fns';
import { v4 } from 'uuid';

import type { Bill } from '../types/bill.types';
import { LOCAL_STORAGE_KEYS } from '../constants/local-storage-keys';

const parseAndSortBills = (raw: string | null): Bill[] => {
  const bills: Bill[] = raw ? JSON.parse(raw) : [];
  return bills.sort(
    (a, b) => parseISO(a.dueDate).getTime() - parseISO(b.dueDate).getTime(),
  );
};

const useBills = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const persist = useCallback(async (updatedBills: Bill[]) => {
    await AsyncStorage.setItem(
      LOCAL_STORAGE_KEYS.BILLS,
      JSON.stringify(updatedBills),
    );
  }, []);

  const loadBills = useCallback(async () => {
    setIsLoading(true);
    try {
      const raw = await AsyncStorage.getItem(LOCAL_STORAGE_KEYS.BILLS);
      const parsedBills = parseAndSortBills(raw);
      setBills(parsedBills);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBills();
  }, [loadBills]);

  const groupedBills = useMemo(() => {
    return Object.entries(
      bills.reduce<Record<string, Bill[]>>((acc, bill) => {
        const dateKey = bill.dueDate.split('T')[0];
        (acc[dateKey] ||= []).push(bill);
        return acc;
      }, {}),
    );
  }, [bills]);

  const totalAmount = useMemo(() => {
    return bills.reduce((sum, bill) => sum + (bill.paid ? 0 : bill.amount), 0);
  }, [bills]);

  const addBill = useCallback(
    async (bill: Omit<Bill, 'id'>) => {
      const newBill = { ...bill, id: v4() };
      const updated = [...bills, newBill];
      setBills(updated);
      await persist(updated);
    },
    [bills, persist],
  );

  const updateBill = useCallback(
    async (updatedBill: Bill) => {
      const updated = bills.map(b =>
        b.id === updatedBill.id ? updatedBill : b,
      );
      setBills(updated);
      await persist(updated);
    },
    [bills, persist],
  );

  const deleteBill = useCallback(
    async (id: string) => {
      const updated = bills.filter(b => b.id !== id);
      setBills(updated);
      await persist(updated);
    },
    [bills, persist],
  );

  return {
    bills,
    totalAmount,
    groupedBills,
    isLoading,
    addBill,
    updateBill,
    deleteBill,
    reloadBills: loadBills,
  };
};

export default useBills;
