import { currencyParse } from '@shared/helpers/currency';
import { localDateString } from '@shared/helpers/date';
import { undefinedResolver } from '@shared/helpers/guards';

import { BillForm } from '../hooks/useBillForm';
import { Bill } from '../types';

export function toDomain(formData: BillForm) {
  const { isPaidOnCreation } = formData;

  const bill: Omit<Bill, 'id' | 'recurringRuleId'> = {
    description: formData.description.trim(),
    category: undefinedResolver(formData.category),
    billType: formData.billType,
    notes: undefinedResolver(formData.notes),
    amount: undefinedResolver(currencyParse(formData.amount)),
    dueDate: localDateString(isPaidOnCreation ? undefined : formData.dueDate),
    paymentDate: isPaidOnCreation ? localDateString() : null,
    installment: null,
  };

  return bill;
}
