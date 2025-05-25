import { Bill } from '../../domain/models/Bill';
import { IBillService } from '../../domain/services/IBillService';

class BillRepository {
  constructor(private service: IBillService) {}

  async getAll(): Promise<Bill[]> {
    const bills = await this.service.getAll();
    return this.sortBillsByDueDate(bills);
  }

  private sortBillsByDueDate(bills: Bill[]): Bill[] {
    return bills.sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    );
  }

  async save(bill: Bill): Promise<Bill> {
    return this.service.save(bill);
  }

  async delete(id: string): Promise<void> {
    return this.service.delete(id);
  }

  async markAsPaid(id: string, paymentDate: string): Promise<Bill | undefined> {
    return this.service.markAsPaid(id, paymentDate);
  }
}

export default BillRepository;
