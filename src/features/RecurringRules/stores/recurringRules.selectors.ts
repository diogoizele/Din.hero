import { RootState } from '@core/config/redux/store';

export const selectRecurringRules = (state: RootState) =>
  state.recurringRules.rules;

export const selectRecurringRulesStatus = (state: RootState) =>
  state.recurringRules.status;
