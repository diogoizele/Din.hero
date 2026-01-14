import { useCallback, useState } from 'react';

import * as billService from '../services/billsService';
import { Bill } from '../types';
import { endOfDay, startOfDay } from 'date-fns';

export function useBills() {
  const [bills, setBills] = useState<Bill[]>([]);

  const period = {
    startDate: startOfDay(new Date()).toISOString(),
    endDate: endOfDay(
      new Date(new Date().setDate(new Date().getDate() + 30)),
    ).toISOString(),
  };

  const fetchBills = useCallback(async () => {
    const { startDate, endDate } = period;

    try {
      const fetchedBills = await billService.getBillsDueInPeriod({
        startDate,
        endDate,
      });
      setBills(fetchedBills);
    } catch (error) {
      console.error('Error fetching bills: ', error);
    }
  }, []);

  return {
    bills,
    fetchBills,
  };
}
