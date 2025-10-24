import { Button, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { Keyboard, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { styles } from './styles';
import Icon from '../../components/Icon';
import TextField from '../../components/TextField';
import Switch from '../../components/Switch';

import AnimatedVisibility from '../../components/AnimatedVisibility';
import useRegisterBillViewModel from './RegisterBillViewModel';
import { Frequency } from '../../domain/Frequency';
import { useTheme } from '../../hooks/useTheme';

function RegisterBill() {
  const { colors } = useTheme();
  const {
    control,
    dueDatePlaceholder,
    errors,
    isRecurrent,
    handleSubmit,
    goBack,
    handleClearFrequency,
  } = useRegisterBillViewModel();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Icon name="arrow-left" size={32} color="transparent" />
        </TouchableOpacity>
        <Text text60M marginL-8 marginT-16>
          Cadastrar Conta
        </Text>
      </View>

      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraScrollHeight={Platform.select({ android: 140, ios: 90 })}
        keyboardShouldPersistTaps="handled">
        <View
          style={styles.container}
          onTouchStart={Keyboard.dismiss}
          onTouchEnd={event => event?.stopPropagation()}>
          <View style={styles.formContainer}>
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
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Esta conta se repete? </Text>
              <Switch
                control={control}
                name="isRecurrent"
                onPress={handleClearFrequency}
              />
            </View>
            <TextField
              control={control}
              error={errors.dueDate?.message}
              name="dueDate"
              placeholder={dueDatePlaceholder}
              minimumDate={new Date()}
              type="date"
            />

            <AnimatedVisibility isVisible={isRecurrent}>
              <TextField
                control={control}
                error={errors.frequency?.message}
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
            <Text text70 R color={colors.$textNeutral}>
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
                { label: 'Telefonia e Internet', value: 'phone_internet' },
                { label: 'Saúde', value: 'health' },
                { label: 'Educação', value: 'education' },
                { label: 'Lazer', value: 'leisure' },
                { label: 'Pets', value: 'pets' },
                { label: 'Fatura do Cartão', value: 'credit_card' },
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
          text70M
          onPress={handleSubmit}
          borderRadius={8}
        />
      </View>
    </SafeAreaView>
  );
}

export default RegisterBill;
