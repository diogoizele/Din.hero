import * as firebaseSrc from './billsSource.firebase';

export const addBill = firebaseSrc.addBillFirebase;
export const addRecurringRuleAndBill =
  firebaseSrc.addRecurringRuleAndBillFirebase;
export const listBills = firebaseSrc.listBillPaginatedFirebase;
export const getBillsDueInPeriod = firebaseSrc.listBillsByDateRangeFirebase;
export const updateBill = firebaseSrc.updateBillFirebase;
