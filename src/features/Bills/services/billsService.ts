import { endOfDay, startOfDay } from 'date-fns';

import { parseApiError } from '@core/api';
import { localDateInstance } from '@shared/helpers/date';

import { AddBillData, Bill, UpdateBillData } from './billsService.types';
import {
  addBillFirebase,
  listBillPaginatedFirebase,
  listBillsByDateRangeFirebase,
  listBillByIdFirebase,
  updateBillFirebase,
  deleteBillFirebase,
  createBillIfPendingFirebase,
} from './billsSource.firebase';

export const BillsService = {
  getAll: listBillPaginatedFirebase,
  getBillsDueInPeriod: listBillsByDateRangeFirebase,
  getUpcomingBillsIn30Days: (): Promise<Bill[]> => {
    const now = localDateInstance();

    const startDate = startOfDay(now).toISOString();
    const endDate = endOfDay(new Date(now.setDate(now.getDate() + 30))).toISOString();
    console.log({
      startDate,
      endDate,
    });


    try {
      const response = listBillsByDateRangeFirebase({
        startDate, endDate,
      });

      return response;
    } catch (error) {
      throw parseApiError(error);
    }
  },
  getBillById: listBillByIdFirebase,

  create: (bill: AddBillData, isRecurring = false): Promise<Bill> => {
    return addBillFirebase(bill, isRecurring);
  },

  update: (id: string, bill: UpdateBillData): Promise<Bill> => {
    return updateBillFirebase(id, bill);
  },

  delete: (id: string): Promise<void> => {
    return deleteBillFirebase(id);
  },

  createBillIfPending: createBillIfPendingFirebase,
};
