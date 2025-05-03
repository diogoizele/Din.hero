export type Bill = {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  paid: boolean;
  paymentDate?: string;
  category: string;
  frequency: string;
  notes?: string;
};
