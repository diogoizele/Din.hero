import { combineReducers } from '@reduxjs/toolkit';
import { homeReducer } from './home/home.slice';
import { recurringRulesReducer } from './recurringRules/recurringRules.slice';

export const homeCombinedReducers = combineReducers({
  main: homeReducer,
  recurringRules: recurringRulesReducer,
});
