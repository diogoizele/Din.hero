import { DateOnly } from 'src/shared/types';
import { Category } from '@features/Bills/types/Category';

export interface RecurringRule {
  id: string;

  description: string;

  fixedAmount: number | null;

  category: Category | null;

  dayOfMonth: number; // 1..31

  startDate: DateOnly;
  endDate: DateOnly | null;

  lastGeneratedDate: DateOnly | null;

  notes: string | null;

  active: boolean;
}
