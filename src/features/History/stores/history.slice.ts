import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Bill } from '../../Bills/types';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { fetchNextBillsPage } from './history.thunks';
import { SortOption } from './history.types';

export interface HistoryStateSchema {
  bills: Bill[];
  sortOption: SortOption;
  fetchBillsStatus: 'idle' | 'loading' | 'succeeded' | 'failed' | 'fetching';
  lastDoc?: FirebaseFirestoreTypes.QueryDocumentSnapshot;
  hasMore: boolean;
  pageSize: number;
}

export const historyInitialState: HistoryStateSchema = {
  bills: [],
  sortOption: SortOption.DUE_DATE,
  fetchBillsStatus: 'idle',
  hasMore: true,
  pageSize: 10,
};

const historySlice = createSlice({
  name: 'history',
  initialState: historyInitialState,
  reducers: {
    resetBills(state) {
      state.bills = [];
      state.lastDoc = undefined;
      state.hasMore = true;
      state.fetchBillsStatus = 'idle';
      state.sortOption = SortOption.DUE_DATE;
    },
    setSortOption(state, action: PayloadAction<SortOption>) {
      state.sortOption = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNextBillsPage.pending, state => {
        if (state.bills.length === 0) {
          state.fetchBillsStatus = 'loading';
        } else {
          state.fetchBillsStatus = 'fetching';
        }
      })
      .addCase(fetchNextBillsPage.fulfilled, (state, action) => {
        state.fetchBillsStatus = 'succeeded';

        if (!action.payload) {
          state.hasMore = false;
          return;
        }

        state.bills = Object.values(
          [...state.bills, ...action.payload.bills].reduce((acc, bill) => {
            acc[bill.id] = bill;
            return acc;
          }, {} as Record<string, Bill>),
        );

        state.lastDoc = action.payload.lastDoc;

        if (action.payload.bills.length < state.pageSize) {
          state.hasMore = false;
        }
      })
      .addCase(fetchNextBillsPage.rejected, (state, action) => {
        state.fetchBillsStatus = 'failed';
        state.hasMore = false;
      });
  },
});

export const { resetBills, setSortOption } = historySlice.actions;

export const historyReducer = historySlice.reducer;
