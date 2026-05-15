import { StyleSheet } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';

import { useStyled, useTheme } from '@shared/hooks';
import { Select, TextField } from '@shared/ui';
import AnimatedVisibility from '@shared/components/AnimatedVisibility';
import { currencyFormat, currencyParse } from '@shared/helpers/currency';
import {
  BillFormControl,
  BillFormErrors,
} from '@features/Bills/hooks/useBillForm';
import { categoryOptions } from '@features/Bills/static/dropdownOptions';

import { BillFormModes } from '../index';
import { Theme } from '../../../theme';

type Props = {
  control: BillFormControl;
  errors: BillFormErrors;
  installments: number | null;
  totalAmount: string;
  mode: BillFormModes;
};

export function InstallmentsBillForm({
  control,
  errors,
  installments,
  totalAmount,
  mode,
}: Props) {
  const [styles, theme] = useStyled(createStyles);

  const getInstallmentsDescription = () => {
    if (!installments || !totalAmount) {
      return null;
    }

    const amount = currencyParse(totalAmount);

    if (amount && Number(installments) === 1) {
      return `Será criada 1 parcela de ${currencyFormat(amount)}`;
    }

    return `Serão criadas ${installments} parcelas de ${currencyFormat(
      amount! / installments!,
    )}`;
  };

  return (
    <>
      <Text color={theme.colors.textPrimary}>Informações básicas</Text>

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
          <Text text70 R color={theme.colors.$textNeutral}>
            Recorrência
          </Text>
          <TextField.Controlled
            control={control}
            error={!!errors.installments?.message}
            errorMessage={errors.installments?.message}
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
            error={!!errors.dueDate?.message}
            name="dueDate"
            placeholder="Data de vencimento"
            minimumDate={new Date()}
            type="date"
          />
        </>
      )}

      <Text text70 R color={theme.colors.textPrimary}>
        Informações adicionais
      </Text>
      <Select.Controlled
        control={control}
        name="category"
        placeholder="Categoria"
        options={categoryOptions}
      />
      <TextField.Controlled
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

const createStyles = (theme: Theme) =>
  StyleSheet.create({
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
      color: theme.colors.textPrimary,
      fontWeight: '500',
    },
  });
