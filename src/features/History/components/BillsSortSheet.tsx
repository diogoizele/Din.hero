import { useState } from 'react';
import { SortOption } from '../stores/history/history.types';
import { Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { Button } from '../../../core/components';

type Props = {
  initialValue: SortOption;
  onConfirm: (sort: SortOption) => void;
  onCancel: () => void;
};

const sortOptionsLabels: Record<SortOption, string> = {
  [SortOption.CREATED_AT]: 'Data de criação',
  [SortOption.PAID_AT]: 'Data de pagamento',
  [SortOption.DUE_DATE]: 'Data de vencimento',
};

export const BillsSortSheet = ({
  initialValue,
  onConfirm,
  onCancel,
}: Props) => {
  const [selected, setSelected] = useState<SortOption>(initialValue);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ordenar por</Text>

      <View marginT-8>
        {Object.entries(sortOptionsLabels).map(([key, label]) => {
          const value = key as SortOption;
          const isSelected = selected === value;

          return (
            <TouchableOpacity
              key={value}
              style={styles.radioRow}
              activeOpacity={0.7}
              onPress={() => setSelected(value)}>
              <View style={[styles.radio, isSelected && styles.radioSelected]}>
                {isSelected && <View style={styles.radioInner} />}
              </View>

              <Text style={styles.radioLabel}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.actions}>
        <View flex-1 marginT-16 marginB-24>
          <Button mode="outlined" label="Cancelar" onPress={onCancel} />
        </View>
        <View flex-1 marginT-16 marginB-24>
          <Button label="Confirmar" onPress={() => onConfirm(selected)} />
        </View>
      </View>
    </View>
  );
};

const RADIO_SIZE = 20;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  radio: {
    width: RADIO_SIZE,
    height: RADIO_SIZE,
    borderRadius: RADIO_SIZE / 2,
    borderWidth: 2,
    borderColor: Colors.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioSelected: {
    borderColor: Colors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  radioLabel: {
    fontSize: 15,
    color: Colors.textPrimary,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 12,
  },
  cancelButton: {
    backgroundColor: Colors.grey70,
  },
  confirmButton: {
    backgroundColor: Colors.primary,
  },
  cancelText: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  confirmText: {
    color: Colors.white,
    fontWeight: '600',
  },
});
