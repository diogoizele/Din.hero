import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '@features/Auth/stores/auth.slice';
import { homeReducer } from '@features/Home/stores/home.slice';

export const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
});
