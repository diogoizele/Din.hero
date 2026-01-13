import { createAsyncThunk } from '@reduxjs/toolkit';
import * as billService from '@features/Bills/services/billsService';
import { ChangeBillPaymentStatusArgs } from './historyDetails.types';

const fetchBillDetails = createAsyncThunk(
  'historyDetails/fetchBillDetails',
  async (billId: string) => {
    return await billService.getBillById(billId);
  },
);

const changeBillPaymentStatus = createAsyncThunk(
  'historyDetails/changeBillPaymentStatus',
  async ({ id, markAsPaid }: ChangeBillPaymentStatusArgs, thunkAPI) => {
    try {
      if (markAsPaid) {
        await billService.updateBill(id, {
          paymentDate: new Date().toISOString(),
        });
      } else {
        await billService.updateBill(id, { paymentDate: null });
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
      await billService.deleteBill(billId);
      return billId;
    } catch (error) {
      console;
      return thunkAPI.rejectWithValue('Failed to delete bill');
    }
  },
);

export { fetchBillDetails, deleteBill, changeBillPaymentStatus };
