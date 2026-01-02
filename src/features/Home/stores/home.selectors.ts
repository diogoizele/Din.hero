import { RootState } from '@core/config/redux/store';

export const selectGroupedBills = (state: RootState) =>
  state.home.bills.reduce((groups, bill) => {
    const dateKey = bill.dueDate.split('T')[0];
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(bill);
    return groups;
  }, {} as Record<string, typeof state.home.bills>);

export const hasBillsSelector = (state: RootState) =>
  state.home.bills.length > 0;

export const selectFetchBillsStatus = (state: RootState) =>
  state.home.fetchBillsStatus;

export const selectTotalAmount = (state: RootState) =>
  state.home.bills.reduce((sum, bill) => sum + (bill.amount ?? 0), 0);

export const selectBillDetails = (state: RootState) =>
  state.home.bottomSheet.billDetails;

export const selectBottomSheetType = (state: RootState) =>
  state.home.bottomSheet.type;

export const selectUpdateBillAmountStatus = (state: RootState) =>
  state.home.updateBillAmountStatus;
