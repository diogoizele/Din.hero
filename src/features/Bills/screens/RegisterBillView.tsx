import React from 'react';
import { Keyboard, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { ActionSheet, Button, Colors, Text, View } from 'react-native-ui-lib';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import TextField from '@core/components/TextField';
import Switch from '@core/components/Switch';
import AnimatedVisibility from '@core/components/AnimatedVisibility';
import { useTheme } from '@core/hooks/useTheme';
import Header from '@core/components/Header';
import { Category, BillType, Frequency } from '@features/Bills/types';
import { useRegisterBillForm } from '@features/Bills/hooks/useRegisterBillForm';
import Icon from '../../../core/components/Icon';

function RegisterBill() {
  const { colors } = useTheme();
  const {
    control,
    errors,
    isRecurrent,
    billType,
    handleSubmit,
    handleClearFrequency,
  } = useRegisterBillForm();

  const renderOneTimeForm = () => {
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
      </>
    );
  };

  const renderInstallmentForm = () => {
    return (
      <>
        <TextField
          control={control}
          name="billType"
          placeholder="Tipo de Conta"
          type="picker"
          items={[
            { label: 'Avulsa', value: BillType.ONE_TIME },
            { label: 'Parcelamento', value: BillType.INSTALLMENT },
            { label: 'Recorrente', value: BillType.RECURRING },
          ]}
        />
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
          placeholder={
            isRecurrent ? 'Dia do primeiro vencimento' : 'Data de vencimento'
          }
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
            { label: 'Moradia', value: Category.GROCERIES },
            { label: 'Transporte', value: Category.TRANSPORT },
            { label: 'Alimentação', value: Category.FOOD },
            { label: 'Assinatura', value: Category.SUBSCRIPTION },
            {
              label: 'Telefonia e Internet',
              value: Category.PHONE_INTERNET,
            },
            { label: 'Saúde', value: Category.HEALTH },
            { label: 'Educação', value: Category.EDUCATION },
            { label: 'Lazer', value: Category.LEISURE },
            { label: 'Pets', value: Category.PETS },
            { label: 'Fatura do Cartão', value: Category.CREDIT_CARD },
            { label: 'Imprevistos', value: Category.UNEXPECTED },
            { label: 'Outros', value: Category.OTHERS },
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
      </>
    );
  };

  const renderRecurringForm = () => {
    return <></>;
  };

  const Forms = {
    [BillType.ONE_TIME]: renderOneTimeForm,
    [BillType.INSTALLMENT]: renderInstallmentForm,
    [BillType.RECURRING]: renderRecurringForm,
  };

  const renderForm = () => {
    if (!billType) {
      return <></>;
    }

    return Forms[billType]();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Cadastrar Conta" />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraScrollHeight={Platform.select({ android: 140, ios: 90 })}
        keyboardShouldPersistTaps="handled">
        <View
          style={styles.container}
          onTouchStart={Keyboard.dismiss}
          onTouchEnd={event => event?.stopPropagation()}>
          <View style={styles.formContainer}>
            <View style={styles.infoContainer}>
              <Text text70 R color={colors.$textNeutral}>
                Tipo de Conta
              </Text>
              <TouchableOpacity style={styles.infoTooltip}>
                <Icon name="info" size={16} color={colors.$textNeutral} />
              </TouchableOpacity>
            </View>
            <TextField
              control={control}
              name="billType"
              placeholder="Tipo de Conta"
              type="picker"
              items={[
                { label: 'Avulsa', value: BillType.ONE_TIME },
                { label: 'Parcelamento', value: BillType.INSTALLMENT },
                { label: 'Recorrente', value: BillType.RECURRING },
              ]}
            />

            {renderForm()}
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.background,
  },
  formContainer: {
    flex: 1,
    width: '100%',
    padding: 24,
    gap: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoTooltip: {
    padding: 8,
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
  footerContainer: {
    width: '100%',
    padding: 24,
    justifyContent: 'flex-end',
    backgroundColor: Colors.background,
  },
});

export default RegisterBill;
