import { Category } from './Category';

export interface RecurringRule {
  id: string;

  description: string;

  fixedAmount: number | null;

  category: Category | null;

  dayOfMonth: number;

  startDate: string;
  endDate: string | null;

  lastGeneratedAt: string | null;

  notes: string | null;

  createdAt: string;
  updatedAt: string;
}
