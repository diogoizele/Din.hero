import { RootState } from '@core/config/redux/store';

export const selectRecurringRules = (state: RootState) =>
  state.recurringRules.rules;

export const selectRecurringRulesStatus = (state: RootState) =>
  state.recurringRules.status;

export const selectRuleDetails = (state: RootState) =>
  state.recurringRules.ruleDetails;

export const selectRuleDetailsStatus = (state: RootState) =>
  state.recurringRules.statusDetails;

export const selectRecurringRulesActionStatus = (state: RootState) =>
  state.recurringRules.actionStatus;
