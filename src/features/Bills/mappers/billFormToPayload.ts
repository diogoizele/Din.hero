import { currencyParse } from '@core/helpers/currency';

import { RegisterBillForm } from '../hooks/useRegisterBillForm';
import { Bill, RecurringRule } from '../types';

const undefinedResolver = (value: any) => (value === undefined ? null : value);

export function billFormToPayload(
  formData: RegisterBillForm,
): Omit<Bill, 'id'> {
  const { isPaidOnCreation } = formData;

  const now = new Date().toISOString();

  return {
    description: formData.description,
    amount: undefinedResolver(currencyParse(formData.amount)),
    dueDate: isPaidOnCreation ? now : formData.dueDate.toISOString(),
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
  formData: Omit<RegisterBillForm, 'amount'> & { amount: number },
  installments: Bill['installment'],
): Omit<Bill, 'id'> {
  return {
    description: formData.description,
    billType: formData.billType,
    amount: formData.amount,
    dueDate: formData.dueDate.toISOString(),
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
  formData: RegisterBillForm,
): Omit<RecurringRule, 'id'> {
  return {
    description: formData.description,
    fixedAmount: formData.amount ? currencyParse(formData.amount) : null,
    category: undefinedResolver(formData.category),
    dayOfMonth: formData.dueDate.getDate(),
    startDate: formData.dueDate.toISOString(),
    endDate: null,
    lastGeneratedAt: null,
    notes: undefinedResolver(formData.notes),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
