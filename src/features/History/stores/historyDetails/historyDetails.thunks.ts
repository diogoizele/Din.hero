import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getBillById,
  deleteBill as deleteBillService,
} from '../../../Bills/services/billsService';

const fetchBillDetails = createAsyncThunk(
  'historyDetails/fetchBillDetails',
  async (billId: string) => {
    return await getBillById(billId);
  },
);

const deleteBill = createAsyncThunk(
  'historyDetails/deleteBill',
  async (billId: string, thunkAPI) => {
    try {
      await deleteBillService(billId);
      return billId;
    } catch (error) {
      console;
      return thunkAPI.rejectWithValue('Failed to delete bill');
    }
  },
);

export { fetchBillDetails, deleteBill };
