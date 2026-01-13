import { createAsyncThunk } from '@reduxjs/toolkit';

import * as recurringRulesService from '../services/recurringRulesService';
import { ToggleActivityPayload } from './recurringRules.types';

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

const fetchRuleById = createAsyncThunk(
  'recurringRules/fetchRuleById',
  async (id: string, thunkAPI) => {
    try {
      const response = await recurringRulesService.listRuleById(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch recurring rule by ID');
    }
  },
);

const toggleActiveStatus = createAsyncThunk(
  'recurringRules/toggleActiveStatus',
  async ({ id, isActive }: ToggleActivityPayload, thunkAPI) => {
    try {
      await recurringRulesService.updateRecurringRule(id, { active: isActive });
      return { id, isActive };
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to toggle active status');
    }
  },
);

const deleteRecurringRule = createAsyncThunk(
  'recurringRules/deleteRecurringRule',
  async (id: string, thunkAPI) => {
    try {
      await recurringRulesService.deleteRecurringRule(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to delete recurring rule');
    }
  },
);

export {
  fetchRecurringRules,
  fetchRuleById,
  toggleActiveStatus,
  deleteRecurringRule,
};
