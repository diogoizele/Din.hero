import { createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '@core/config/redux/store';
import { listBills } from '@features/Bills/services/billsService';
import { SortOption } from './history.types';

const fetchNextBillsPage = createAsyncThunk(
  'history/fetchNextBillsPage',
  async (_, { getState }) => {
    const { history } = getState() as RootState;

    const { lastDoc, pageSize, hasMore, sortOption } = history.historyHome;

    if (!hasMore) {
      return null;
    }

    const mapSortOption = {
      [SortOption.DUE_DATE]: 'dueDate',
      [SortOption.CREATED_AT]: 'createdAt',
      [SortOption.PAID_AT]: 'paymentDate',
    } as const;

    return await listBills({
      pageSize,
      lastDoc,
      sortOption: mapSortOption[sortOption],
    });
  },
);

export { fetchNextBillsPage };
