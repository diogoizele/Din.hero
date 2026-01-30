import { DateOnly } from '@core/types';
import { Category } from '@features/Bills/types/Category';

export interface RecurringRule {
  id: string;

  description: string;

  fixedAmount: number | null;

  category: Category | null;

  dayOfMonth: number; // 1..31

  startDate: DateOnly;
  endDate: DateOnly | null;

  lastGeneratedAt: string | null;

  notes: string | null;

  active: boolean;

  createdAt: string;
  updatedAt: string;
}
