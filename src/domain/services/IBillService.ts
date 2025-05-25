import { Bill } from '../models/Bill';

export interface IBillService {
  getAll(): Promise<Bill[]>;
  save(bill: Bill): Promise<Bill>;
  delete(id: string): Promise<void>;
  markAsPaid(id: string, paymentDate: string): Promise<Bill | undefined>;
}
