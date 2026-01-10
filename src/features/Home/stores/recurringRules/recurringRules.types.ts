import { Bill } from '@features/Bills/types';

export interface CreateBillByRecurringRulePayload extends Omit<Bill, 'id'> {
  recurringRuleId: string;
}
