import { createSlice } from '@reduxjs/toolkit';

import { Bill } from '@features/Bills/types';

import { deleteBill, fetchBillDetails } from './historyDetails.thunks';

export type HistoryDetailsSchema = {
  status: 'idle' | 'loading' | 'error';
  bill: Bill | null;

  deleteBillStatus?: 'loading' | 'succeeded' | 'failed';
};

const historyDetailsInitialState: HistoryDetailsSchema = {
  bill: null,
  status: 'idle',
};

export const historyDetailsSlice = createSlice({
  name: 'historyDetails',
  initialState: historyDetailsInitialState,
  reducers: {
    resetHistoryDetailsState: () => historyDetailsInitialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBillDetails.pending, state => {
        state.status = 'loading';
        state.bill = null;
      })
      .addCase(fetchBillDetails.fulfilled, (state, action) => {
        state.status = 'idle';
        state.bill = action.payload;
      })
      .addCase(fetchBillDetails.rejected, state => {
        state.status = 'error';
        state.bill = null;
      })
      .addCase(deleteBill.pending, state => {
        state.deleteBillStatus = 'loading';
      })
      .addCase(deleteBill.fulfilled, state => {
        state.deleteBillStatus = 'succeeded';
      })
      .addCase(deleteBill.rejected, state => {
        state.deleteBillStatus = 'failed';
      });
  },
});

export const historyDetailsReducer = historyDetailsSlice.reducer;

export const { resetHistoryDetailsState } = historyDetailsSlice.actions;
