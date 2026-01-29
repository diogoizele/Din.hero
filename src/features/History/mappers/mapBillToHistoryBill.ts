import { isToday, isTomorrow, isYesterday } from 'date-fns';

import { Bill, BillStatus } from '@features/Bills/types';
import { getOnlyDatePart, storageToAppDate } from '@core/helpers/date';

import { HistoryBill } from '../types/HistoryBill';

export function mapBillToHistoryBill(bill: Bill): HistoryBill {
  let status: HistoryBill['status'];

  const isPaid = Boolean(bill.paymentDate);
  const dueDate = storageToAppDate(bill.dueDate);
  const overdueDate = dueDate < storageToAppDate(getOnlyDatePart(new Date()));

  if (isPaid) {
    const paymentDate = storageToAppDate(bill.paymentDate!);

    if (isYesterday(paymentDate)) {
      status = BillStatus.PAID_YESTERDAY;
    } else if (isToday(paymentDate)) {
      status = BillStatus.PAID_TODAY;
    } else {
      status = BillStatus.PAID;
    }
  } else if (isToday(dueDate)) {
    status = BillStatus.DUE_TODAY;
  } else if (isTomorrow(dueDate)) {
    status = BillStatus.DUE_TOMORROW;
  } else if (overdueDate) {
    if (isYesterday(dueDate)) {
      status = BillStatus.OVERDUE_YESTERDAY;
    } else {
      status = BillStatus.OVERDUE;
    }
  } else {
    status = BillStatus.UPCOMING;
  }
  return {
    ...bill,
    status,
    isPaid,
    isOverdue: overdueDate,
  };
}
