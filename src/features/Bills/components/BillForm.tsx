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

import { BillForm, useBillForm } from '../hooks/useBillForm';
import { BillType } from '../types';
import {
  OneTimeBillForm,
  InstallmentsBillForm,
  RecurringBillForm,
  BillTypeInfoSheet,
  BillRecurrentFixedAmountSheet,
  BillPaidOnCreateSheet,
} from '.';

type Props = {
  title: string;
  submitLabel: string;
  defaultValues?: Partial<BillForm>;
  onSubmit: (
    data: BillForm,
    args: {
      clearErrors: () => void;
      handleValidate: (data: BillForm) => boolean;
    },
  ) => void;
};

export function BillFormComponent({
  defaultValues,
  title,
  submitLabel,
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
    clearErrors,
    handleValidate,
  } = useBillForm({ defaultValues });

  console.log({ defaultValues });

  const handleSubmitForm = handleSubmit(data =>
    onSubmit(data, {
      clearErrors,
      handleValidate,
    }),
  );

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
          label={submitLabel}
          size="large"
          text70M
          onPress={handleSubmitForm}
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
