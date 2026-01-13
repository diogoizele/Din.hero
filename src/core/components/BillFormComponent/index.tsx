import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Keyboard, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib';

import { useTheme } from '@core/hooks';
import { useBottomSheet } from '@core/providers/BottomSheetProvider';
import {
  AnimatedVisibility,
  BottomSheet,
  Button,
  Header,
  Icon,
  TextField,
} from '@core/components';
import { currencyParse } from '@core/helpers/currency';

import { BillForm, useBillForm } from '@features/Bills/hooks/useBillForm';
import { BillType } from '@features/Bills/types';

import { OneTimeBillForm } from './forms/OneTimeBillForm';
import { InstallmentsBillForm } from './forms/InstallmentsBillForm';
import { RecurringBillForm } from './forms/RecurringBillForm';
import { BillTypeInfoSheet } from './sheets/BillTypeInfoSheet';
import { BillRecurrentFixedAmountSheet } from './sheets/BillRecurrentFixedAmountSheet';
import { BillPaidOnCreateSheet } from './sheets/BillPaidOnCreateSheet';

export enum BillFormModes {
  CREATE_BILL = 'create-bill',
  EDIT_BILL = 'edit-bill',
  EDIT_RECURRING_BILL = 'edit-recurring-bill',
}

type Props = {
  title: string;
  submitLabel: string;
  defaultValues?: Partial<BillForm>;
  mode: BillFormModes;
  onSubmit: (data: BillForm) => void;
};

export function BillFormComponent({
  defaultValues,
  title,
  submitLabel,
  mode,
  onSubmit,
}: Props) {
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
    validate,
  } = useBillForm({ defaultValues });

  const onSubmitForm = handleSubmit(data => {
    if (!validate(data)) {
      return;
    }

    onSubmit(data);
  });

  const billTypeSheetRef = useBottomSheet('billTypeInfo');
  const billRecurrentFixedAmountSheetRef = useBottomSheet(
    'billRecurrentFixedAmount',
  );
  const billPaidOnCreationSheetRef = useBottomSheet('billPaidOnCreation');

  const FORM_BY_TYPE = {
    [BillType.ONE_TIME]: (
      <OneTimeBillForm
        control={control}
        errors={errors}
        isPaidOnCreation={isPaidOnCreation}
        handleShowTooltip={billPaidOnCreationSheetRef.open}
      />
    ),
    [BillType.INSTALLMENT]: (
      <InstallmentsBillForm
        control={control}
        errors={errors}
        installments={installments}
        totalAmount={currencyParse(amount)}
        mode={mode}
      />
    ),
    [BillType.RECURRING]: (
      <RecurringBillForm
        control={control}
        errors={errors}
        isRecurrentFixedAmount={isRecurrentFixedAmount}
        handleShowTooltip={billRecurrentFixedAmountSheetRef.open}
        mode={mode}
      />
    ),
  };

  const FormComponent = billType ? FORM_BY_TYPE[billType] : null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title={title} />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraScrollHeight={Platform.select({ android: 140, ios: 90 })}
        keyboardShouldPersistTaps="handled">
        <View
          style={styles.container}
          onTouchStart={Keyboard.dismiss}
          onTouchEnd={event => event?.stopPropagation()}>
          <View style={styles.formContainer}>
            {mode !== BillFormModes.EDIT_RECURRING_BILL && (
              <>
                <View style={styles.infoContainer}>
                  <Text text70 R color={colors.$textNeutral}>
                    Tipo de Conta
                  </Text>
                  <TouchableOpacity
                    style={styles.infoTooltip}
                    onPress={billTypeSheetRef.open}>
                    <Icon
                      name="info"
                      size={16}
                      color={colors.$textNeutralLight}
                    />
                  </TouchableOpacity>
                </View>
                <TextField
                  disabled={mode !== BillFormModes.CREATE_BILL}
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
              </>
            )}
            <AnimatedVisibility isVisible={!!billType}>
              <View style={styles.dynamicFormContainer}>{FormComponent}</View>
            </AnimatedVisibility>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.footerContainer}>
        <Button
          label={submitLabel}
          size="large"
          text70M
          onPress={onSubmitForm}
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
