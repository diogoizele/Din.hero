import { createAsyncThunk } from '@reduxjs/toolkit';
import { BillsService } from '@features/Bills/services/billsService';
import { ChangeBillPaymentStatusArgs } from './historyDetails.types';

const fetchBillDetails = createAsyncThunk(
  'historyDetails/fetchBillDetails',
  async (billId: string) => {
    return await BillsService.getBillById(billId);
  },
);

const changeBillPaymentStatus = createAsyncThunk(
  'historyDetails/changeBillPaymentStatus',
  async ({ id, markAsPaid }: ChangeBillPaymentStatusArgs, thunkAPI) => {
    try {
      if (markAsPaid) {
        await BillsService.update(id, {
          paymentDate: new Date().toISOString(),
        });
      } else {
        await BillsService.update(id, { paymentDate: null });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to mark bill as paid');
    }
  },
);

const deleteBill = createAsyncThunk(
  'historyDetails/deleteBill',
  async (billId: string, thunkAPI) => {
    try {
      await BillsService.delete(billId);
      return billId;
    } catch (error) {
      console;
      return thunkAPI.rejectWithValue('Failed to delete bill');
    }
  },
);

export { fetchBillDetails, deleteBill, changeBillPaymentStatus };
