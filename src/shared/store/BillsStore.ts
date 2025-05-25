import { create } from 'zustand';
import { Bill } from '../../domain/models/Bill';

interface BillsStoreSchema {
  bills: Bill[];
  setBills: (bills: Bill[]) => void;
  addBill: (bill: Bill) => void;
  updateBill: (bill: Bill) => void;
  deleteBill: (id: string) => void;
  markAsPaid: (id: string, paymentDate: string) => void;
}

export const BillsStateSelectors = {
  bills: (state: BillsStoreSchema) => state.bills,
  setBills: (state: BillsStoreSchema) => state.setBills,
  addBill: (state: BillsStoreSchema) => state.addBill,
  updateBill: (state: BillsStoreSchema) => state.updateBill,
  deleteBill: (state: BillsStoreSchema) => state.deleteBill,
  markAsPaid: (state: BillsStoreSchema) => state.markAsPaid,
};

export const BillsStore = create<BillsStoreSchema>(set => ({
  bills: [],
  setBills: (bills: Bill[]) => set({ bills }),
  addBill: (bill: Bill) => set(state => ({ bills: [...state.bills, bill] })),
  updateBill: (bill: Bill) =>
    set(state => ({
      bills: state.bills.map(b => (b.id === bill.id ? bill : b)),
    })),
  deleteBill: (id: string) =>
    set(state => ({
      bills: state.bills.filter(b => b.id !== id),
    })),
  markAsPaid: (id: string, paymentDate: string) =>
    set(state => ({
      bills: state.bills.map(b =>
        b.id === id ? { ...b, paid: true, paymentDate } : b,
      ),
    })),
}));

const useBillsStore = () => {
  const bills = BillsStore(BillsStateSelectors.bills);
  const setBills = BillsStore(BillsStateSelectors.setBills);
  const addBill = BillsStore(BillsStateSelectors.addBill);
  const updateBill = BillsStore(BillsStateSelectors.updateBill);
  const deleteBill = BillsStore(BillsStateSelectors.deleteBill);
  const markAsPaid = BillsStore(BillsStateSelectors.markAsPaid);

  return {
    bills,
    setBills,
    addBill,
    updateBill,
    deleteBill,
    markAsPaid,
  };
};
export default useBillsStore;
