import { useEffect, useMemo, useState } from 'react';

import type { Bill } from '../types/bill.types';
import { parseISO } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchBillsFromStorage = async () => {
  const bills = await AsyncStorage.getItem('bills');

  const parsedBills = bills ? JSON.parse(bills) : [];

  const sortedBills = parsedBills.sort((a: Bill, b: Bill) => {
    const dateA = parseISO(a.dueDate);
    const dateB = parseISO(b.dueDate);
    return dateA.getTime() - dateB.getTime();
  });

  return sortedBills;
};

const useBills = () => {
  const [_bills, setBills] = useState<Bill[]>([]);

  const totalAmount = useMemo(() => {
    return _bills.reduce((acc, bill) => {
      if (bill.paid) {
        return acc;
      }
      return acc + bill.amount;
    }, 0);
  }, [_bills]);

  const getBills = async () => {
    const billsData = await fetchBillsFromStorage();
    setBills(billsData as Bill[]);
  };
  const bills = useMemo(() => {
    return Object.entries(
      _bills.reduce<Record<string, Bill[]>>((acc, bill) => {
        const dateKey = parseISO(bill.dueDate).toISOString().split('T')[0];
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(bill);
        return acc;
      }, {}),
    );
  }, [_bills]);

  const addBill = async (bill: Bill) => {
    const newBill = { ...bill, id: String(new Date().getTime()) };
    setBills(prevBills => [...prevBills, newBill]);
    await AsyncStorage.setItem('bills', JSON.stringify([..._bills, newBill]));
  };

  const updateBill = async (updatedBill: Bill) => {
    setBills(prevBills =>
      prevBills.map(bill => (bill.id === updatedBill.id ? updatedBill : bill)),
    );
    await AsyncStorage.setItem(
      'bills',
      JSON.stringify(
        _bills.map(bill => (bill.id === updatedBill.id ? updatedBill : bill)),
      ),
    );
  };

  const deleteBill = async (id: string) => {
    setBills(prevBills => prevBills.filter(bill => bill.id !== id));
    await AsyncStorage.setItem(
      'bills',
      JSON.stringify(_bills.filter(bill => bill.id !== id)),
    );
  };

  useEffect(() => {
    const fetchBills = async () => {
      const billsData = await fetchBillsFromStorage();
      setBills(billsData as Bill[]);
    };

    fetchBills();
  }, []);

  return {
    bills,
    totalAmount,
    getBills,
    addBill,
    updateBill,
    deleteBill,
  };
};

export default useBills;
