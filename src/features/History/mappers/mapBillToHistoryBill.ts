import { isToday, isTomorrow, isYesterday } from 'date-fns';

import { Bill, BillStatus } from '@features/Bills/types';
import { getOnlyDatePart, storageToAppDate } from '@core/helpers/date';

import { HistoryBill } from '../types/HistoryBill';

export function mapBillToHistoryBill(bill: Bill): HistoryBill {
  let status: HistoryBill['status'];

  const isPaid = Boolean(bill.paymentDate);

  const todayStr = getOnlyDatePart(new Date());
  const dueDateStr = getOnlyDatePart(bill.dueDate);
  const overdueDate = dueDateStr < todayStr;

  const dueDateApp = storageToAppDate(bill.dueDate);

  if (isPaid) {
    const paymentDateApp = storageToAppDate(bill.paymentDate!);

    if (isYesterday(paymentDateApp)) {
      status = BillStatus.PAID_YESTERDAY;
    } else if (isToday(paymentDateApp)) {
      status = BillStatus.PAID_TODAY;
    } else {
      status = BillStatus.PAID;
    }
  } else {
    if (isToday(dueDateApp)) {
      status = BillStatus.DUE_TODAY;
    } else if (isTomorrow(dueDateApp)) {
      status = BillStatus.DUE_TOMORROW;
    } else if (overdueDate) {
      if (isYesterday(dueDateApp)) {
        status = BillStatus.OVERDUE_YESTERDAY;
      } else {
        status = BillStatus.OVERDUE;
      }
    } else {
      status = BillStatus.UPCOMING;
    }
  }

  return {
    ...bill,
    status,
    isPaid,
    isOverdue: overdueDate,
  };
}
