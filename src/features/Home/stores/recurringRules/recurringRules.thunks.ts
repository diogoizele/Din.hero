import { createAsyncThunk } from '@reduxjs/toolkit';

import * as recurringRulesService from '@features/RecurringRules/services/recurringRulesService';
import * as billService from '@features/Bills/services/billsService';
import { CreateBillByRecurringRulePayload } from './recurringRules.types';

const fetchRecurringRules = createAsyncThunk(
  'recurringRules/fetchRecurringRules',
  async (_, thunkAPI) => {
    try {
      const recurringRules = await recurringRulesService.listRecurringRules();
      return recurringRules;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch recurring rules');
    }
  },
);

const generateNextBillByRecurringRule = createAsyncThunk(
  'recurringRules/generateNextBillByRecurringRule',
  async (payload: CreateBillByRecurringRulePayload, thunkAPI) => {
    try {
      const newBill = await billService.addRecurringBill(
        payload.recurringRuleId,
        payload,
      );

      return newBill;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        'Failed to generate bill from recurring rule',
      );
    }
  },
);

export { fetchRecurringRules, generateNextBillByRecurringRule };
