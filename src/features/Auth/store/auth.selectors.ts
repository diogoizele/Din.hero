import { RootState } from '@core/config/redux/store';

export const isLoggedInSelector = (state: RootState) => !!state.auth.user;
