import { createAsyncThunk } from '@reduxjs/toolkit';

import * as recurringRulesService from '../services/recurringRulesService';

const fetchRecurringRules = createAsyncThunk(
  'recurringRules/fetchRecurringRules',
  async (_, thunkAPI) => {
    try {
      const response = await recurringRulesService.listRecurringRules();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch recurring rules');
    }
  },
);

export { fetchRecurringRules };
