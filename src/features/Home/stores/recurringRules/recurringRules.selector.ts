import { RootState } from '@core/config/redux/store';

export const selectHomeRecurringRules = (state: RootState) =>
  state.home.recurringRules.rules;
