import { RootState } from '@core/config/redux/store';
import { createSelector } from '@reduxjs/toolkit';

import { SortOption } from './history.types';

export const selectAllBills = (state: RootState) =>
  state.history.historyHome.bills;

export const selectSortOption = (state: RootState) =>
  state.history.historyHome.sortOption;

export const selectGroupedBills = createSelector(
  [selectAllBills, selectSortOption],
  (bills, sortOption) =>
    bills.reduce((groups, bill) => {
      const mapDataProp = {
        [SortOption.CREATED_AT]: 'createdAt',
        [SortOption.PAID_AT]: 'paymentDate',
        [SortOption.DUE_DATE]: 'dueDate',
      } as const;

      const mappedDate = bill[mapDataProp[sortOption]] ?? bill.dueDate;

      const dateKey = mappedDate.split('T')[0];

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(bill);
      return groups;
    }, {} as Record<string, typeof bills>),
);

export const selectHasMoreBills = (state: RootState) =>
  state.history.historyHome.hasMore;

export const selectFetchBillsStatus = (state: RootState) =>
  state.history.historyHome.fetchBillsStatus;
