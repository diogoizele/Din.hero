import { Bill } from '../models/Bill';
import AsyncStorageBillsService from '../sources/AsyncStorageBillsService';

const dataSource = new AsyncStorageBillsService();

export const billRepository = {
  getAllBills: async () => {
    return dataSource.getAll();
  },
  getHomeBills: async () => {
    const bills = await dataSource.getAll();
    const unpaidBills = bills
      .filter(bill => !bill.paid)
      .sort((a, b) => {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
    const totalAmount = unpaidBills.reduce((sum, bill) => sum + bill.amount, 0);

    const groupedBills = unpaidBills.reduce<Record<string, Bill[]>>(
      (acc, bill) => {
        const dateKey = bill.dueDate.split('T')[0];
        (acc[dateKey] ||= []).push(bill);
        return acc;
      },
      {},
    );

    return {
      unpaidBills: groupedBills,
      unpaidTotalAmount: totalAmount,
    };
  },
  saveBill: async (bill: Bill) => {
    return dataSource.save(bill);
  },
  deleteBill: async (id: string) => {
    return dataSource.delete(id);
  },
  markAsPaid: async (id: string, paymentDate: string) => {
    return dataSource.markAsPaid(id, paymentDate);
  },
};
