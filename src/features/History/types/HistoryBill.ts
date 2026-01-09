import { Bill, BillStatus } from '@features/Bills/types';

export interface HistoryBill extends Bill {
  status: BillStatus;
}
