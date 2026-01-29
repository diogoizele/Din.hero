import { currencyParse } from '@core/helpers/currency';
import { getOnlyDatePart } from '@core/helpers/date';
import { undefinedResolver } from '@core/helpers/guards';
import { RecurringRule } from '@features/RecurringRules/types/RecurringRule';

import { BillForm } from '../hooks/useBillForm';
import { Bill } from '../types';

export function billFormToPayload(formData: BillForm): Omit<Bill, 'id'> {
  const { isPaidOnCreation } = formData;

  const now = new Date().toISOString();
  const dueDate = isPaidOnCreation ? now : formData.dueDate;

  return {
    description: formData.description.trim(),
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
    description: formData.description.trim(),
    billType: formData.billType,
    amount: parseFloat(formData.amount),
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
  return {
    description: formData.description.trim(),
    fixedAmount: undefinedResolver(currencyParse(formData.amount)),
    category: undefinedResolver(formData.category),
    dayOfMonth: formData.dueDate.getDate(),
    startDate: getOnlyDatePart(formData.dueDate),
    endDate: null,
    lastGeneratedAt: null,
    notes: undefinedResolver(formData.notes),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    active: true,
  };
}
