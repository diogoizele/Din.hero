import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Bill } from '@features/Bills/types';
import {
  fetchMonthlyBills,
  markBillAsPaid,
  updateBillAmount,
} from './home.thunks';

export interface HomeStateSchema {
  bills: Bill[];
  fetchBillsStatus: 'idle' | 'loading' | 'succeeded' | 'failed';

  bottomSheet: {
    billDetails: Bill | null;
    type: 'edit' | 'view';
  };

  updateBillAmountStatus?: 'idle' | 'loading' | 'succeeded' | 'failed';

  markAsPaidStatus?: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export const homeInitialState: HomeStateSchema = {
  bills: [],
  fetchBillsStatus: 'idle',

  bottomSheet: {
    billDetails: null,
    type: 'view',
  },

  updateBillAmountStatus: 'idle',

  markAsPaidStatus: 'idle',
};

const homeSlice = createSlice({
  name: 'home',
  initialState: homeInitialState,
  reducers: {
    selectBill(state, action: PayloadAction<Bill>) {
      state.bottomSheet.billDetails = action.payload;
    },
    setBottomSheetType(state, action: PayloadAction<'edit' | 'view'>) {
      state.bottomSheet.type = action.payload;
    },
    resetBottomSheet(state) {
      state.bottomSheet.billDetails = null;
      state.bottomSheet.type = 'view';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMonthlyBills.pending, state => {
        state.fetchBillsStatus = 'loading';
      })
      .addCase(fetchMonthlyBills.fulfilled, (state, action) => {
        state.fetchBillsStatus = 'succeeded';
        state.bills = action.payload;
      })
      .addCase(fetchMonthlyBills.rejected, state => {
        state.fetchBillsStatus = 'failed';
      })
      .addCase(updateBillAmount.pending, state => {
        state.updateBillAmountStatus = 'loading';
      })
      .addCase(
        updateBillAmount.fulfilled,
        (state, action: PayloadAction<Bill>) => {
          state.updateBillAmountStatus = 'succeeded';
          const updatedBill = action.payload;

          const index = state.bills.findIndex(
            bill => bill.id === updatedBill.id,
          );

          if (index !== -1) {
            state.bills[index] = updatedBill;
          }
        },
      )
      .addCase(updateBillAmount.rejected, state => {
        state.updateBillAmountStatus = 'failed';
      })
      .addCase(markBillAsPaid.pending, state => {
        state.markAsPaidStatus = 'loading';
        console.log('pending markBillAsPaid');
      })
      .addCase(markBillAsPaid.fulfilled, state => {
        state.markAsPaidStatus = 'succeeded';
      })
      .addCase(markBillAsPaid.rejected, state => {
        state.markAsPaidStatus = 'failed';
        console.log('rejected markBillAsPaid');
      });
  },
});

export const { selectBill, setBottomSheetType, resetBottomSheet } =
  homeSlice.actions;

export const homeReducer = homeSlice.reducer;
