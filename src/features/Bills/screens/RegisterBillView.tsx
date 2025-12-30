import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Keyboard,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { View, Text, Button, Colors } from 'react-native-ui-lib';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import TextField from '@core/components/TextField';
import Switch from '@core/components/Switch';
import AnimatedVisibility from '@core/components/AnimatedVisibility';
import { useTheme } from '@core/hooks/useTheme';
import Header from '@core/components/Header';
import Icon from '@core/components/Icon';
import { Category, BillType, Frequency } from '@features/Bills/types';
import { useRegisterBillForm } from '@features/Bills/hooks/useRegisterBillForm';
import BottomSheet from '@gorhom/bottom-sheet';
import { BillTypeInfoSheet } from '../components/BillTypeInfoSheet';
import { BillRecurrentFixedAmountSheet } from '../components/BillRecurrentFixedAmountSheet';
import { callMicrotasks } from 'react-native-reanimated/lib/typescript/threads';

function RegisterBill() {
  const { colors } = useTheme();
  const {
    control,
    errors,
    isRecurrent,
    billType,
    isRecurrentFixedAmount,
    handleSubmit,
    handleClearFrequency,
  } = useRegisterBillForm();

  const billTypeSheetRef = useRef<BottomSheet>(null);
  const billRecurrentFixedAmountSheetRef = useRef<BottomSheet>(null);

  const handleOpenBillTypeInfo = () => {
    billTypeSheetRef.current?.snapToIndex(1);
  };

  const handleOpenBillRecurrentFixedAmountInfo = () => {
    billRecurrentFixedAmountSheetRef.current?.snapToIndex(1);
  };

  useEffect(() => {
    billTypeSheetRef.current?.collapse();
    billTypeSheetRef.current?.close();
    billTypeSheetRef.current?.forceClose();

    billRecurrentFixedAmountSheetRef.current?.close();
    billRecurrentFixedAmountSheetRef.current?.collapse();
    billRecurrentFixedAmountSheetRef.current?.forceClose();
  }, []);

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

  const renderInstallmentForm = () => {
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
          error={errors.installments?.message}
          name="installments"
          placeholder="Número de parcelas"
          keyboardType="number-pad"
        />

        <TextField
          control={control}
          error={errors.dueDate?.message}
          name="dueDate"
          placeholder="Data de vencimento"
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
              onPress={handleOpenBillRecurrentFixedAmountInfo}>
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
          placeholder="Dia do primeiro vencimento"
          minimumDate={new Date()}
          type="date"
        />
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

  const Forms = {
    [BillType.ONE_TIME]: renderOneTimeForm,
    [BillType.INSTALLMENT]: renderInstallmentForm,
    [BillType.RECURRING]: renderRecurringForm,
  };

  const renderForm = () => {
    if (!billType) {
      return null;
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
              <TouchableOpacity
                style={styles.infoTooltip}
                onPress={handleOpenBillTypeInfo}>
                <Icon name="info" size={16} color={colors.$textNeutralLight} />
              </TouchableOpacity>
            </View>
            <TextField
              control={control}
              name="billType"
              placeholder="Tipo de Conta"
              type="picker"
              items={[
                { label: 'Única', value: BillType.ONE_TIME },
                { label: 'Parcelamento', value: BillType.INSTALLMENT },
                { label: 'Recorrente', value: BillType.RECURRING },
              ]}
            />

            <AnimatedVisibility isVisible={!!billType}>
              <View style={styles.dynamicFormContainer}>{renderForm()}</View>
            </AnimatedVisibility>
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
      <BillTypeInfoSheet ref={billTypeSheetRef} />
      <BillRecurrentFixedAmountSheet ref={billRecurrentFixedAmountSheetRef} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    width: '100%',
  },
  formContainer: {
    flex: 1,
    width: '100%',
    padding: 24,
    gap: 16,
  },
  dynamicFormContainer: {
    flex: 1,
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
  footerContainer: {
    width: '100%',
    padding: 24,
    justifyContent: 'flex-end',
    backgroundColor: Colors.background,
  },
});

export default RegisterBill;
