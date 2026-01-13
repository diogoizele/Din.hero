import { createSlice } from '@reduxjs/toolkit';

import { RecurringRule } from '@features/RecurringRules/types';
import { fetchRecurringRules } from './recurringRules.thunks';

export interface RecurringRulesStateSchema {
  rules: RecurringRule[];
}

const recurringRulesInitialState: RecurringRulesStateSchema = {
  rules: [],
};

const recurringRulesSlice = createSlice({
  name: 'recurringRules',
  initialState: recurringRulesInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchRecurringRules.fulfilled, (state, action) => {
      state.rules = action.payload;
    });
  },
});

export const recurringRulesActions = recurringRulesSlice.actions;

export const recurringRulesReducer = recurringRulesSlice.reducer;
