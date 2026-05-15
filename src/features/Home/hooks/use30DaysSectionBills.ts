import { useQuery } from '@tanstack/react-query';

import { DateOnly } from '@shared/types';
import { BillsService } from '@features/Bills/services/billsService';
import { Bill } from '@features/Bills/types';
import { useUser } from '@features/Auth';

export const use30DaysSectionBills = () => {
  const user = useUser();

  console.log({ id: user?.id });

  return useQuery({
    queryFn: BillsService.getUpcomingBillsIn30Days,
    queryKey: ['upcoming-bills-in-30-days', user?.id],
    select: bills => {
      return Object.entries(bills.reduce((groups, bill) => {
        const dateKey = bill.dueDate;

        if (!groups[dateKey]) {
          groups[dateKey] = [];
        }

        groups[dateKey].push(bill);

        return groups;
      }, {} as Record<DateOnly, Bill[]>)).map((([date, group]) => ({
        title: date as DateOnly,
        data: [group],
      })));
    },
  });
};
