import { RootState } from '@core/config/redux/store';
import { createSelector } from '@reduxjs/toolkit';

import { DateOnly } from '@core/types';

export const selectBills = (state: RootState) => state.home.main.bills;

export const selectGroupedBills = createSelector([selectBills], bills =>
  bills.reduce((groups, bill) => {
    const dateKey = bill.dueDate;
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(bill);
    return groups;
  }, {} as Record<DateOnly, typeof bills>),
);

export const hasBillsSelector = (state: RootState) =>
  state.home.main.bills.length > 0;

export const selectFetchBillsStatus = (state: RootState) =>
  state.home.main.fetchBillsStatus;

export const selectTotalAmount = (state: RootState) =>
  state.home.main.bills.reduce((sum, bill) => sum + (bill.amount ?? 0), 0);

export const selectBillDetails = (state: RootState) =>
  state.home.main.bottomSheet.billDetails;

export const selectBottomSheetType = (state: RootState) =>
  state.home.main.bottomSheet.type;

export const selectUpdateBillAmountStatus = (state: RootState) =>
  state.home.main.updateBillAmountStatus;
