import AsyncStorage from '@react-native-async-storage/async-storage';

import { Bill } from '../../domain/Bill';

class AsyncStorageBillsService {
  private storageKey = '@bills';

  async getAll(): Promise<Bill[]> {
    const bills = await AsyncStorage.getItem(this.storageKey);
    return bills ? JSON.parse(bills) : [];
  }

  async save(bill: Bill): Promise<Bill> {
    const bills = await this.getAll();
    const updatedBills = [...bills, bill];
    await AsyncStorage.setItem(this.storageKey, JSON.stringify(updatedBills));
    return bill;
  }

  async delete(id: string): Promise<void> {
    const bills = await this.getAll();
    const updatedBills = bills.filter((bill: Bill) => bill.id !== id);
    await AsyncStorage.setItem(this.storageKey, JSON.stringify(updatedBills));
  }

  async markAsPaid(id: string, paymentDate: string): Promise<Bill | undefined> {
    const bills = await this.getAll();
    const updatedBills = bills.map((bill: Bill) =>
      bill.id === id ? { ...bill, paid: true, paymentDate } : bill,
    );
    await AsyncStorage.setItem(this.storageKey, JSON.stringify(updatedBills));
    return updatedBills.find((bill: Bill) => bill.id === id);
  }
}

export default AsyncStorageBillsService;
