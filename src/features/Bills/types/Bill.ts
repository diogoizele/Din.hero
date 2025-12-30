import { Category } from './Category';
import { Frequency } from './Frequency';

export interface Bill {
  id: string;

  description: string;

  amount: number | null;

  dueDate: string;
  paymentDate: string | null;

  category: Category | null;

  frequency: Frequency | null;

  installment: {
    current: number;
    total: number;
  } | null;

  notes: string | null;

  recurringRuleId: string | null;

  createdAt: string;
  updatedAt: string;
}
