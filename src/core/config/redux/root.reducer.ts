import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '@features/Auth/stores/auth.slice';
import { homeReducer } from '@features/Home/stores/home.slice';
import { historyCombinedReducer } from '@features/History/stores';

export const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  history: historyCombinedReducer,
});
