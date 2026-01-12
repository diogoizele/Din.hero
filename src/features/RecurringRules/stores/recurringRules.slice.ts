import { createSlice } from '@reduxjs/toolkit';
import { fetchRecurringRules } from './recurringRules.thunks';
import { RecurringRule } from '../types/RecurringRule';

export interface RecurringRulesSchema {
  rules: RecurringRule[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const recurringRulesInitialState: RecurringRulesSchema = {
  rules: [],
  status: 'idle',
};

const recurringRules = createSlice({
  name: 'recurringRules',
  initialState: recurringRulesInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRecurringRules.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchRecurringRules.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rules = action.payload;
      })
      .addCase(fetchRecurringRules.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const { actions: recurringRulesActions } = recurringRules;
export const recurringRulesReducer = recurringRules.reducer;
