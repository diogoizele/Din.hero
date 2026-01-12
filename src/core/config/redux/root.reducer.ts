import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '@features/Auth/stores/auth.slice';
import { historyCombinedReducer } from '@features/History/stores';
import { homeCombinedReducers } from '@features/Home/stores';
import { recurringRulesReducer } from '@features/RecurringRules/stores/recurringRules.slice';

export const rootReducer = combineReducers({
  auth: authReducer,
  home: homeCombinedReducers,
  history: historyCombinedReducer,
  recurringRules: recurringRulesReducer,
});
