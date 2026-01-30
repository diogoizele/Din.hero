import { DateOnly } from '@core/types';
import { BillType } from './BillType';
import { Category } from './Category';

export interface Bill {
  id: string;

  billType: BillType;

  description: string;

  amount: number | null;

  dueDate: DateOnly;
  paymentDate: string | null;

  category: Category | null;

  installment: {
    current: number;
    total: number;
  } | null;

  notes: string | null;

  recurringRuleId: string | null;

  createdAt: string;
  updatedAt: string;
}
