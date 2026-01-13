import {
  AppRoutes,
  AppStackParamList,
} from '@core/navigation/PrivateStackNavigator.types';
import { BillFormComponent } from '@core/components';
import { BillFormModes } from '@core/components/BillFormComponent';
import { currencyFormat } from '@core/helpers/currency';
import { parseAppDate } from '@core/helpers/date';
import { BillType } from '@features/Bills/types';
import { useEditRecurringRule } from '../hooks/useEditRecurringRule';

type Props = {
  route: { params: AppStackParamList[AppRoutes.RECURRING_RULE_EDIT] };
};

function EditRecurringRuleView({ route }: Props) {
  const { recurringRule } = route.params;
  const { onSubmit } = useEditRecurringRule({
    recurringRuleId: recurringRule.id,
  });

  return (
    <BillFormComponent
      title="Editar Regra Recorrente"
      submitLabel="Salvar"
      mode={BillFormModes.EDIT_RECURRING_BILL}
      defaultValues={{
        billType: BillType.RECURRING,
        description: recurringRule.description,
        amount: recurringRule.fixedAmount
          ? currencyFormat(recurringRule.fixedAmount)
          : '',
        category: recurringRule.category,
        dueDate: parseAppDate(recurringRule.startDate),
        notes: recurringRule.notes,
        isRecurrentFixedAmount: Boolean(recurringRule.fixedAmount),
      }}
      onSubmit={onSubmit}
    />
  );
}

export default EditRecurringRuleView;
