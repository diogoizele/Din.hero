import { Frequency } from './Frequency';

export interface Bill {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  paid: boolean;
  paymentDate?: string;
  category?: string;
  frequency?: Frequency;
  notes?: string;
}
