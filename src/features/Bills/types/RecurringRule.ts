import { Category } from './Category';
import { Frequency } from './Frequency';

export interface RecurringRule {
  id: string;

  description: string;

  fixedAmount: number | null;

  category: Category | null;
  frequency: Frequency.MONTHLY;

  dayOfMonth: number;

  startDate: string;
  endDate: string | null;

  lastGeneratedAt: string | null;

  notes: string | null;

  createdAt: string;
  updatedAt: string;
}
