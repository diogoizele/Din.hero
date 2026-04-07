import { combineReducers } from '@reduxjs/toolkit';

import { historyCombinedReducer } from '@features/History/stores';
import { homeCombinedReducers } from '@features/Home/stores';
import { recurringRulesReducer } from '@features/RecurringRules/stores/recurringRules.slice';

export const rootReducer = combineReducers({
  home: homeCombinedReducers,
  history: historyCombinedReducer,
  recurringRules: recurringRulesReducer,
});
