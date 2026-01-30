import { isToday, isTomorrow, isYesterday } from 'date-fns';

import { Bill, BillStatus } from '@features/Bills/types';
import { dateOnlyToLocalDate, localDateToDateOnly } from '@core/helpers/date';

import { HistoryBill } from '../types/HistoryBill';

export function mapBillToHistoryBill(bill: Bill): HistoryBill {
  let status: HistoryBill['status'];

  const isPaid = Boolean(bill.paymentDate);

  const today = localDateToDateOnly(new Date());
  const overdueDate = bill.dueDate < today;

  const dueDateApp = dateOnlyToLocalDate(bill.dueDate);

  if (isPaid) {
    const paymentDateApp = new Date(bill.paymentDate!);

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
