import { RootState } from '@core/config/redux/store';

export const isLoggedInSelector = (state: RootState) => !!state.auth.user;

export const selectUser = (state: RootState) => state.auth.user;