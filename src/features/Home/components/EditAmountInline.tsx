import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { Colors } from 'react-native-ui-lib';

import {
  currencyFormatter,
  currencyParser,
} from '@core/components/TextField/masks/currency';
import { currencyParse } from '@core/helpers/currency';
import { useAppDispatch } from '@core/hooks';

import { updateBillAmount } from '../stores/home/home.thunks';

type Props = {
  value: number;
  onClose: () => void;
};

export function EditAmountInline({ value, onClose }: Props) {
  const dispatch = useAppDispatch();

  const [draft, setDraft] = useState(String(value));

  const handleChange = (text: string) => {
    const parsed = currencyParser(text);
    setDraft(String(parsed));
  };

  const handleSubmitEditing = () => {
    Keyboard.dismiss();
    if (draft) {
      const newAmount = currencyParse(draft);

      if (newAmount !== null && newAmount > 0) {
        dispatch(updateBillAmount(newAmount));
      }
    }
  };

  return (
    <View style={styles.editor}>
      <TextInput
        onSubmitEditing={handleSubmitEditing}
        returnKeyType="done"
        value={currencyFormatter(draft)}
        onChangeText={handleChange}
        keyboardType="decimal-pad"
        autoFocus
        style={styles.input}
      />

      <View style={styles.actions}>
        <Pressable onPress={onClose}>
          <Text style={styles.cancel}>Cancelar</Text>
        </Pressable>

        <Pressable onPress={handleSubmitEditing}>
          <Text style={styles.confirm}>Salvar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  display: {
    gap: 4,
  },
  amount: {
    fontSize: 24,
    fontWeight: '600',
  },
  editHint: {
    fontSize: 12,
    opacity: 0.6,
  },
  editor: {
    gap: 8,
    alignItems: 'center',
  },
  input: {
    width: '50%',
    borderBottomColor: Colors.$textNeutralLight,
    fontSize: 24,
    borderBottomWidth: 1,
    paddingVertical: 4,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
  },
  cancel: {
    opacity: 0.6,
  },
  confirm: {
    fontWeight: '600',
  },
});
