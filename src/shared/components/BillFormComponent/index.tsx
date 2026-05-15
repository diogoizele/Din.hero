import { forwardRef, useImperativeHandle } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Keyboard,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { useStyled } from '@shared/hooks';
import { useBottomSheet } from '@app/providers/BottomSheetProvider';
import { AnimatedVisibility, BottomSheet } from '@shared/components';
import { Theme } from '@shared/theme';
import { Text, Button, Icon, Select } from '@shared/ui';
import { BillForm, useBillForm } from '@features/Bills/hooks/useBillForm';
import { BillType } from '@features/Bills/types';

import { OneTimeBillForm } from './forms/OneTimeBillForm';
import { InstallmentsBillForm } from './forms/InstallmentsBillForm';
import { RecurringBillForm } from './forms/RecurringBillForm';
import { BillTypeInfoSheet } from './sheets/BillTypeInfoSheet';
import { BillRecurrentFixedAmountSheet } from './sheets/BillRecurrentFixedAmountSheet';
import { BillPaidOnCreateSheet } from './sheets/BillPaidOnCreateSheet';
import { applyOpacity } from '../../helpers/colors';

export enum BillFormModes {
  CREATE_BILL = 'create-bill',
  EDIT_BILL = 'edit-bill',
  EDIT_RECURRING_BILL = 'edit-recurring-bill',
}

type Props = {
  submitLabel: string;
  defaultValues?: Partial<BillForm>;
  mode: BillFormModes;
  onSubmit: (data: BillForm) => void;
};

export type BillFormComponentRef = {
  onFormDirty: (callback: (isDirty: boolean) => void) => void;
};

export const BillFormComponent = forwardRef<BillFormComponentRef, Props>(
  ({ defaultValues, submitLabel, mode, onSubmit }, ref) => {
    const [styles, theme] = useStyled(createStyles);
    const {
      control,
      errors,
      isDirty,
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

    const onFormDirty = (callback: (isDirty: boolean) => void) => {
      callback(isDirty);
    };

    useImperativeHandle(ref, () => ({
      onFormDirty,
    }));

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
          mode={mode}
        />
      ),
      [BillType.INSTALLMENT]: (
        <InstallmentsBillForm
          control={control}
          errors={errors}
          installments={installments ? Number(installments) : null}
          totalAmount={amount}
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
      <>
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
                <View>
                  <View style={styles.infoContainer}>
                    <Text color={theme.colors.textPrimary}>Tipo de Conta</Text>
                    <TouchableOpacity
                      style={styles.infoTooltip}
                      onPress={() => billTypeSheetRef.open()}>
                      <Icon
                        name="circle-info"
                        size={14}
                        color={applyOpacity(theme.colors.textSecondary, 0.5)}
                      />
                    </TouchableOpacity>
                  </View>
                  <Select.Controlled
                    disabled={mode !== BillFormModes.CREATE_BILL}
                    control={control}
                    name="billType"
                    placeholder="Tipo de Conta"
                    options={[
                      { label: 'Única', value: BillType.ONE_TIME },
                      { label: 'Parcelamento', value: BillType.INSTALLMENT },
                      { label: 'Recorrente', value: BillType.RECURRING },
                    ]}
                  />
                </View>
              )}
              <AnimatedVisibility isVisible={!!billType}>
                <View style={styles.dynamicFormContainer}>{FormComponent}</View>
              </AnimatedVisibility>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.footerContainer}>
          <Button label={submitLabel} onPress={onSubmitForm} />
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
      </>
    );
  },
);

const createStyles = (theme: Theme) =>
  StyleSheet.create({
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
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    switchLabel: {
      fontSize: 16,
      color: theme.colors.textPrimary,
      fontWeight: '500',
    },
    footerContainer: {
      width: '100%',
      padding: 24,
      justifyContent: 'flex-end',
    },
  });
