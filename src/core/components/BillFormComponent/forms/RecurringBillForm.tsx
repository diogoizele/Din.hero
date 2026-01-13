import { Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';

import { useTheme } from '@core/hooks';
import TextField from '@core/components/TextField';
import AnimatedVisibility from '@core/components/AnimatedVisibility';
import Switch from '@core/components/Switch';
import Icon from '@core/components/Icon';
import {
  BillFormControl,
  BillFormErrors,
} from '@features/Bills/hooks/useBillForm';
import { categoryOptions } from '@features/Bills/static/dropdownOptions';

import { BillFormModes } from '..';

type Props = {
  control: BillFormControl;
  errors: BillFormErrors;
  isRecurrentFixedAmount: boolean;
  mode: BillFormModes;
  handleShowTooltip: () => void;
};

export function RecurringBillForm({
  control,
  errors,
  isRecurrentFixedAmount,
  mode,
  handleShowTooltip,
}: Props) {
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

      <View style={styles.switchContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.switchLabel}>Valor recorrente fixo</Text>
          <TouchableOpacity
            style={styles.infoTooltip}
            onPress={handleShowTooltip}>
            <Icon name="info" size={16} color={colors.$textNeutralLight} />
          </TouchableOpacity>
        </View>
        <Switch
          control={control}
          name="isRecurrentFixedAmount"
          value={isRecurrentFixedAmount}
        />
      </View>

      <AnimatedVisibility isVisible={isRecurrentFixedAmount}>
        <TextField
          control={control}
          error={errors.amount?.message}
          name="amount"
          placeholder="Valor"
          keyboardType="number-pad"
          mask="currency"
        />
      </AnimatedVisibility>

      <Text text70 R color={colors.$textNeutral}>
        Recorrência
      </Text>
      <TextField
        control={control}
        error={errors.dueDate?.message}
        name="dueDate"
        placeholder={
          [BillFormModes.EDIT_BILL, BillFormModes.EDIT_RECURRING_BILL].includes(
            mode,
          )
            ? 'Vencimento'
            : 'Dia do primeiro vencimento'
        }
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

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoTooltip: {
    padding: 8,
    paddingBottom: 6,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  switchLabel: {
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
});
