import { createSlice } from '@reduxjs/toolkit';
import {
  deleteRecurringRule,
  fetchRecurringRules,
  fetchRuleById,
  toggleActiveStatus,
} from './recurringRules.thunks';
import { RecurringRule } from '../types/RecurringRule';

export interface RecurringRulesSchema {
  rules: RecurringRule[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';

  ruleDetails: RecurringRule | null;
  statusDetails: 'idle' | 'loading' | 'succeeded' | 'failed';

  actionStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const recurringRulesInitialState: RecurringRulesSchema = {
  rules: [],
  status: 'idle',

  ruleDetails: null,
  statusDetails: 'idle',

  actionStatus: 'idle',
};

const recurringRules = createSlice({
  name: 'recurringRules',
  initialState: recurringRulesInitialState,
  reducers: {
    resetRecurringRulesState: () => recurringRulesInitialState,
  },
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
      })
      .addCase(fetchRuleById.pending, state => {
        state.statusDetails = 'loading';
      })
      .addCase(fetchRuleById.fulfilled, (state, action) => {
        state.statusDetails = 'succeeded';
        state.ruleDetails = action.payload;
      })
      .addCase(fetchRuleById.rejected, state => {
        state.statusDetails = 'failed';
      })
      .addCase(toggleActiveStatus.pending, state => {
        state.actionStatus = 'loading';
      })
      .addCase(toggleActiveStatus.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded';
        const { id, isActive } = action.payload;

        if (state.ruleDetails && state.ruleDetails.id === id) {
          state.ruleDetails.active = isActive;
        }
      })
      .addCase(toggleActiveStatus.rejected, state => {
        state.actionStatus = 'failed';
      })
      .addCase(deleteRecurringRule.pending, state => {
        state.actionStatus = 'loading';
      })
      .addCase(deleteRecurringRule.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded';
        state.rules = state.rules.filter(rule => rule.id !== action.payload);
      })
      .addCase(deleteRecurringRule.rejected, state => {
        state.actionStatus = 'failed';
      });
  },
});

export const { resetRecurringRulesState } = recurringRules.actions;
export const recurringRulesReducer = recurringRules.reducer;
