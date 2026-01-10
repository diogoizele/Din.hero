import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBillById } from '../../../Bills/services/billsService';

const fetchBillDetails = createAsyncThunk(
  'historyDetails/fetchBillDetails',
  async (billId: string) => {
    return await getBillById(billId);
  },
);

export { fetchBillDetails };
