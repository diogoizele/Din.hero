import { RootState } from '@core/config/redux/store';

export const selectHistoryBillDetails = (state: RootState) =>
  state.history.historyDetails.bill;

export const selectHistoryBillDetailsStatus = (state: RootState) =>
  state.history.historyDetails.status;
