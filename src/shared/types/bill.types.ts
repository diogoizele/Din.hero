import { Frequency } from '../enums/Frequency';

export type Bill = {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  paid: boolean;
  paymentDate?: string;
  category?: string;
  frequency?: Frequency;
  notes?: string;
};
