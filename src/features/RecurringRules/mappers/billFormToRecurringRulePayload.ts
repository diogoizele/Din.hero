import { getOnlyDatePart } from '@shared/helpers/date';
import { undefinedResolver } from '@shared/helpers/guards';
import { currencyParse } from '@shared/helpers/currency';
import { BillForm } from '@features/Bills/hooks/useBillForm';

import { RecurringRule } from '../types';

export function billFormToRecurringRulePayload(
  formData: BillForm,
): Omit<RecurringRule, 'id'> {
  const { isPaidOnCreation } = formData;

  const now = new Date();
  const dueDate = isPaidOnCreation ? now : formData.dueDate;

  return {
    description: formData.description.trim(),
    fixedAmount: undefinedResolver(currencyParse(formData.amount)),
    startDate: getOnlyDatePart(dueDate),
    category: undefinedResolver(formData.category),

    notes: undefinedResolver(formData.notes),
    dayOfMonth: dueDate.getDate(),
    active: true,
    endDate: null,
    lastGeneratedAt: null,

    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };
}
