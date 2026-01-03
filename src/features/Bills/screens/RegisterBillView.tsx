import React from 'react';
import { Keyboard, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, Button, Colors } from 'react-native-ui-lib';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import TextField from '@core/components/TextField';
import AnimatedVisibility from '@core/components/AnimatedVisibility';
import { useTheme } from '@core/hooks/useTheme';
import Header from '@core/components/Header';
import Icon from '@core/components/Icon';
import { BottomSheet } from '@core/components/BottomSheet';
import { useBottomSheet } from '@core/providers/BottomSheetProvider';
import { BillType } from '@features/Bills/types';
import { useRegisterBillForm } from '@features/Bills/hooks/useRegisterBillForm';
import {
  BillTypeInfoSheet,
  BillRecurrentFixedAmountSheet,
  OneTimeBillForm,
  InstallmentsBillForm,
  RecurringBillForm,
  BillPaidOnCreateSheet,
} from '@features/Bills/components';
import { currencyParse } from '../../../core/helpers/currency';

function RegisterBill() {
  const { colors } = useTheme();
  const {
    control,
    errors,
    billType,
    isRecurrentFixedAmount,
    isPaidOnCreation,
    amount,
    installments,
    handleSubmit,
  } = useRegisterBillForm();

  const billTypeSheetRef = useBottomSheet('billTypeInfo');
  const billRecurrentFixedAmountSheetRef = useBottomSheet(
    'billRecurrentFixedAmount',
  );
  const billPaidOnCreationSheetRef = useBottomSheet('billPaidOnCreation');

  const FORM_BY_TYPE = {
    [BillType.ONE_TIME]: OneTimeBillForm,
    [BillType.INSTALLMENT]: InstallmentsBillForm,
    [BillType.RECURRING]: RecurringBillForm,
  };

  const FormComponent = billType ? FORM_BY_TYPE[billType] : null;

  const handleOpenBillTypeInfo = () => {
    billTypeSheetRef.open();
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
              <View style={styles.dynamicFormContainer}>
                {FormComponent && (
                  <FormComponent
                    control={control}
                    errors={errors}
                    isRecurrentFixedAmount={isRecurrentFixedAmount}
                    isPaidOnCreation={isPaidOnCreation}
                    installments={installments}
                    totalAmount={currencyParse(amount)}
                    handleOpenBillRecurrentFixedAmountInfo={
                      billRecurrentFixedAmountSheetRef.open
                    }
                    handleTogglePaidOnCreation={billPaidOnCreationSheetRef.open}
                  />
                )}
              </View>
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
      <BottomSheet ref={billTypeSheetRef.ref}>
        <BillTypeInfoSheet />
      </BottomSheet>
      <BottomSheet ref={billRecurrentFixedAmountSheetRef.ref}>
        <BillRecurrentFixedAmountSheet />
      </BottomSheet>
      <BottomSheet ref={billPaidOnCreationSheetRef.ref}>
        <BillPaidOnCreateSheet />
      </BottomSheet>
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
