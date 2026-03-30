import {
  AppRoutes,
  AppStackParamList,
} from '@app/navigation/PrivateStackNavigator.types';
import { BillFormComponent } from '@shared/components';
import { BillFormModes } from '@shared/components/BillFormComponent';
import { currencyFormat } from '@shared/helpers/currency';
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
      submitLabel="Salvar"
      mode={BillFormModes.EDIT_RECURRING_BILL}
      defaultValues={{
        billType: BillType.RECURRING,
        description: recurringRule.description,
        amount: recurringRule.fixedAmount
          ? currencyFormat(recurringRule.fixedAmount)
          : '',
        category: recurringRule.category,
        dueDate: new Date(recurringRule.startDate),
        notes: recurringRule.notes,
        isRecurrentFixedAmount: Boolean(recurringRule.fixedAmount),
      }}
      onSubmit={onSubmit}
    />
  );
}

export default EditRecurringRuleView;
