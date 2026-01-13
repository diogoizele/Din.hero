import { combineReducers } from '@reduxjs/toolkit';

import { historyReducer } from './history/history.slice';
import { historyDetailsReducer } from './historyDetails/historyDetails.slice';

export const historyCombinedReducer = combineReducers({
  historyHome: historyReducer,
  historyDetails: historyDetailsReducer,
});
