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
