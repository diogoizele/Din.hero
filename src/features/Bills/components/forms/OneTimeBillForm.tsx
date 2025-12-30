import { Text } from 'react-native-ui-lib';

import { useTheme } from '@core/hooks';
import TextField from '@core/components/TextField';

import {
  RegisterBillFormControl,
  RegisterBillFormErrors,
} from '../../hooks/useRegisterBillForm';
import { categoryOptions } from '../../static/dropdownOptions';

type Props = {
  control: RegisterBillFormControl;
  errors: RegisterBillFormErrors;
};

export function OneTimeBillForm({ control, errors }: Props) {
  const { colors } = useTheme();

  return (
    <>
      <Text text70 R color={colors.$textNeutral}>
        Informações básicas
      </Text>
      <TextField
        control={control}
        error={errors.description?.message}
        name="description"
        placeholder="Descrição"
        returnKeyType="done"
      />
      <TextField
        control={control}
        error={errors.amount?.message}
        name="amount"
        placeholder="Valor"
        keyboardType="number-pad"
        mask="currency"
      />

      <Text text70 R color={colors.$textNeutral}>
        Recorrência
      </Text>
      <TextField
        control={control}
        error={errors.dueDate?.message}
        name="dueDate"
        placeholder="Data de vencimento"
        minimumDate={new Date()}
        type="date"
      />

      <Text text70 R color={colors.$textNeutral}>
        Informações adicionais
      </Text>
      <TextField
        control={control}
        name="category"
        placeholder="Categoria"
        type="picker"
        items={categoryOptions}
      />
      <TextField
        control={control}
        name="notes"
        placeholder="Notas"
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />
    </>
  );
}
