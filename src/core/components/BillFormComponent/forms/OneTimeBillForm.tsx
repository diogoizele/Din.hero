import { StyleSheet } from 'react-native';
import { Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib';

import { useTheme } from '@core/hooks';
import TextField from '@core/components/TextField';
import Icon from '@core/components/Icon';
import Switch from '@core/components/Switch';
import AnimatedVisibility from '@core/components/AnimatedVisibility';
import {
  BillFormControl,
  BillFormErrors,
} from '@features/Bills/hooks/useBillForm';
import { categoryOptions } from '@features/Bills/static/dropdownOptions';

type Props = {
  control: BillFormControl;
  errors: BillFormErrors;
  isPaidOnCreation: boolean;
  handleShowTooltip: () => void;
};

export function OneTimeBillForm({
  control,
  errors,
  isPaidOnCreation,
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
      <TextField
        control={control}
        error={errors.amount?.message}
        name="amount"
        placeholder="Valor"
        keyboardType="number-pad"
        mask="currency"
      />

      <View style={styles.switchContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.switchLabel}>Já foi paga?</Text>
          <TouchableOpacity
            style={styles.infoTooltip}
            onPress={handleShowTooltip}>
            <Icon name="info" size={16} color={colors.$textNeutralLight} />
          </TouchableOpacity>
        </View>
        <Switch
          control={control}
          name="isPaidOnCreation"
          value={isPaidOnCreation}
        />
      </View>

      <AnimatedVisibility isVisible={!isPaidOnCreation}>
        <View style={styles.recurrenceContainer}>
          <TextField
            control={control}
            error={errors.dueDate?.message}
            name="dueDate"
            placeholder="Data de vencimento"
            minimumDate={new Date()}
            type="date"
          />
        </View>
      </AnimatedVisibility>

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
