import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@features/Auth/store/auth.slice';

export const rootReducer = combineReducers({
  auth: authReducer,
});
