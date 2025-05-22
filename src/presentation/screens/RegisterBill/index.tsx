import { Button, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { Keyboard, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';

import { styles } from './styles';
import Icon from '../../components/Icon';
import TextField from '../../components/TextField';
import Switch from '../../components/Switch';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Frequency } from '../../../shared/enums/Frequency';
import { useTheme } from '../../../shared/providers/ThemeProvider';
import useBills from '../../../shared/hooks/useBills';
import { currencyParse } from '../../../shared/helpers/currency';
import AnimatedVisibility from '../../components/AnimatedVisibility';

type RegisterBillForm = {
  description: string;
  amount: string;
  dueDate: Date;
  category?: string;
  frequency?: Frequency;
  notes?: string;
  isRecurrent: boolean;
};

const FormDivider = () => {
  const { colors } = useTheme();
  return (
    <View
      height={0.5}
      backgroundColor={colors.$textNeutralLight}
      marginT-44
      marginL-8
      marginR-8
      marginB-16
    />
  );
};

function RegisterBill() {
  const { control, handleSubmit, watch, setValue } = useForm<RegisterBillForm>(
    {},
  );
  const { colors } = useTheme();
  const { goBack } = useNavigation();
  const { addBill } = useBills();

  const isRecurrent = watch('isRecurrent');

  const dueDatePlaceholder = isRecurrent
    ? 'Dia do primeiro vencimento'
    : 'Data de vencimento';

  const onSubmit = (data: RegisterBillForm) => {
    console.log(data);

    addBill({
      id: String(new Date().getTime()),
      amount: currencyParse(data.amount),
      description: data.description,
      dueDate: data.dueDate.toISOString(),
      category: data.category,
      frequency: data.frequency,
      notes: data.notes,
      paid: false,
    });
    goBack();
  };

  const cleanFrequencyField = () => {
    if (!isRecurrent) {
      setValue('frequency', undefined);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Icon name="arrow-left" color="transparent" />
      </TouchableOpacity>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraScrollHeight={Platform.select({ android: 140, ios: 90 })}
        keyboardShouldPersistTaps="handled">
        <View
          style={styles.container}
          onTouchStart={Keyboard.dismiss}
          onTouchEnd={event => event?.stopPropagation()}>
          <View>
            <Text text50 marginL-24 marginT-16>
              Cadastrar Conta
            </Text>
          </View>
          <View style={styles.formContainer}>
            <Text text65 color={colors.$textNeutral}>
              Informações básicas
            </Text>
            <TextField
              control={control}
              name="description"
              placeholder="Descrição"
            />
            <TextField
              control={control}
              name="amount"
              placeholder="Valor"
              keyboardType="numeric"
              mask="currency"
            />
            <FormDivider />
            <Text text65 color={colors.$textNeutral}>
              Recorrência
            </Text>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Esta conta se repete? </Text>
              <Switch
                control={control}
                name="isRecurrent"
                onPress={cleanFrequencyField}
              />
            </View>
            <TextField
              control={control}
              name="dueDate"
              placeholder={dueDatePlaceholder}
              type="date"
            />

            <AnimatedVisibility isVisible={isRecurrent}>
              <TextField
                control={control}
                name="frequency"
                placeholder="Frequência"
                type="picker"
                items={[
                  { label: 'Mensal', value: Frequency.MONTHLY },
                  { label: 'Semestral', value: Frequency.BIANNUAL },
                  { label: 'Anual', value: Frequency.YEARLY },
                ]}
              />
            </AnimatedVisibility>

            <FormDivider />
            <Text text65 color={colors.$textNeutral}>
              Informações adicionais
            </Text>
            <TextField
              control={control}
              name="category"
              placeholder="Categoria"
              type="picker"
              items={[
                { label: 'Moradia', value: 'groceries' },
                { label: 'Transporte', value: 'transport' },
                { label: 'Alimentação', value: 'food' },
                { label: 'Assinatura', value: 'subscription' },
                { label: 'Saúde', value: 'health' },
                { label: 'Educação', value: 'education' },
                { label: 'Lazer', value: 'leisure' },
                { label: 'Pets', value: 'pets' },
                { label: 'Imprevistos', value: 'unexpected' },
                { label: 'Outros', value: 'others' },
              ]}
            />
            <TextField
              control={control}
              name="notes"
              placeholder="Notas"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.footerContainer}>
        <Button
          label="Cadastrar"
          size="large"
          onPress={handleSubmit(onSubmit)}
          borderRadius={8}
          enableShadow
        />
      </View>
    </SafeAreaView>
  );
}

export default RegisterBill;
