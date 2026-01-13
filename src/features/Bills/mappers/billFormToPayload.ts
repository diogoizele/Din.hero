import { currencyParse } from '@core/helpers/currency';

import { BillForm } from '../hooks/useBillForm';
import { Bill } from '../types';
import {
  getOnlyDatePart,
  now as nowDate,
  parseAppDate,
} from '../../../core/helpers/date';
import { RecurringRule } from '../../RecurringRules/types/RecurringRule';

const undefinedResolver = (value: any) => (value === undefined ? null : value);

export function billFormToPayload(formData: BillForm): Omit<Bill, 'id'> {
  const { isPaidOnCreation } = formData;

  const now = nowDate().toISOString();
  const dueDate = isPaidOnCreation ? now : formData.dueDate;

  return {
    description: formData.description,
    amount: undefinedResolver(currencyParse(formData.amount)),
    dueDate: getOnlyDatePart(dueDate),
    category: undefinedResolver(formData.category),
    billType: formData.billType,
    notes: undefinedResolver(formData.notes),
    createdAt: now,
    updatedAt: now,
    paymentDate: isPaidOnCreation ? now : null,
    installment: null,
    recurringRuleId: null,
  };
}

export function billInstallmentFormToPayload(
  formData: BillForm,
  installments: Bill['installment'],
): Omit<Bill, 'id'> {
  return {
    description: formData.description,
    billType: formData.billType,
    amount: currencyParse(formData.amount),
    dueDate: getOnlyDatePart(formData.dueDate),
    category: undefinedResolver(formData.category),
    notes: undefinedResolver(formData.notes),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    paymentDate: null,
    installment: installments,
    recurringRuleId: null,
  };
}

export function recurringRuleToPayload(
  formData: BillForm,
): Omit<RecurringRule, 'id'> {
  const dueDate = parseAppDate(getOnlyDatePart(formData.dueDate));

  return {
    description: formData.description,
    fixedAmount: undefinedResolver(currencyParse(formData.amount)),
    category: undefinedResolver(formData.category),
    dayOfMonth: dueDate.getDate(),
    startDate: getOnlyDatePart(formData.dueDate),
    endDate: null,
    lastGeneratedAt: null,
    notes: undefinedResolver(formData.notes),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    active: true,
  };
}
