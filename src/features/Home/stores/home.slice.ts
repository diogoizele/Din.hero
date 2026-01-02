import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Bill } from '@features/Bills/types';
import { fetchMonthlyBills, updateBillAmount } from './home.thunks';

export interface HomeStateSchema {
  bills: Bill[];
  fetchBillsStatus: 'idle' | 'loading' | 'succeeded' | 'failed';

  bottomSheet: {
    billDetails: Bill | null;
    type: 'edit' | 'view';
  };

  updateBillAmountStatus?: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export const homeInitialState: HomeStateSchema = {
  bills: [],
  fetchBillsStatus: 'idle',

  bottomSheet: {
    billDetails: null,
    type: 'view',
  },

  updateBillAmountStatus: 'idle',
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
    builder.addCase(fetchMonthlyBills.pending, state => {
      state.fetchBillsStatus = 'loading';
    });
    builder.addCase(fetchMonthlyBills.fulfilled, (state, action) => {
      state.fetchBillsStatus = 'succeeded';
      state.bills = action.payload;
    });
    builder.addCase(fetchMonthlyBills.rejected, state => {
      state.fetchBillsStatus = 'failed';
    });
    builder.addCase(updateBillAmount.pending, state => {
      state.updateBillAmountStatus = 'loading';
    });
    builder.addCase(
      updateBillAmount.fulfilled,
      (state, action: PayloadAction<Bill>) => {
        state.updateBillAmountStatus = 'succeeded';
        const updatedBill = action.payload;

        const index = state.bills.findIndex(bill => bill.id === updatedBill.id);

        if (index !== -1) {
          state.bills[index] = updatedBill;
        }
      },
    );
    builder.addCase(updateBillAmount.rejected, state => {
      state.updateBillAmountStatus = 'failed';
    });
  },
});

export const { selectBill, setBottomSheetType, resetBottomSheet } =
  homeSlice.actions;

export const homeReducer = homeSlice.reducer;
