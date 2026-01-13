import { StyleSheet } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';

import { useTheme } from '@core/hooks';
import TextField from '@core/components/TextField';
import AnimatedVisibility from '@core/components/AnimatedVisibility';
import { currencyFormat } from '@core/helpers/currency';
import {
  BillFormControl,
  BillFormErrors,
} from '@features/Bills/hooks/useBillForm';
import { categoryOptions } from '@features/Bills/static/dropdownOptions';

import { BillFormModes } from '..';

type Props = {
  control: BillFormControl;
  errors: BillFormErrors;
  installments: number | null;
  totalAmount: number | null;
  mode: BillFormModes;
};

export function InstallmentsBillForm({
  control,
  errors,
  installments,
  totalAmount,
  mode,
}: Props) {
  const { colors } = useTheme();

  const getInstallmentsDescription = () => {
    if (!installments || !totalAmount) {
      return null;
    }

    if (Number(installments) === 1) {
      return `Será criada 1 parcela de ${currencyFormat(totalAmount)}`;
    }

    return `Serão criadas ${installments} parcelas de ${currencyFormat(
      totalAmount! / installments!,
    )}`;
  };

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
        placeholder="Valor total"
        keyboardType="number-pad"
        mask="currency"
      />

      {![BillFormModes.EDIT_BILL, BillFormModes.EDIT_RECURRING_BILL].includes(
        mode,
      ) && (
        <>
          <Text text70 R color={colors.$textNeutral}>
            Recorrência
          </Text>
          <TextField
            control={control}
            error={errors.installments?.message}
            defaultValue={installments ? String(installments) : ''}
            name="installments"
            placeholder="Número de parcelas"
            keyboardType="number-pad"
          />

          <AnimatedVisibility isVisible={!!installments && !!totalAmount}>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>
                {getInstallmentsDescription()}
              </Text>
            </View>
          </AnimatedVisibility>

          <TextField
            control={control}
            error={errors.dueDate?.message}
            name="dueDate"
            placeholder="Data de vencimento"
            minimumDate={new Date()}
            type="date"
          />
        </>
      )}

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
  recurrenceContainer: {
    gap: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoTooltip: {
    padding: 8,
    paddingBottom: 6,
  },

  infoLabel: {
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
});
