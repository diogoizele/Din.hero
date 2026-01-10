import { createSlice } from '@reduxjs/toolkit';

import { Bill } from '@features/Bills/types';

import { fetchBillDetails } from './historyDetails.thunks';

export type HistoryDetailsSchema = {
  status: 'idle' | 'loading' | 'error';
  bill: Bill | null;
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
      });
  },
});

export const historyDetailsReducer = historyDetailsSlice.reducer;

export const { resetHistoryDetailsState } = historyDetailsSlice.actions;
