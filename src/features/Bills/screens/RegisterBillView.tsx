import React, { useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';

import { BillFormComponent, BottomSheet, Header } from '@core/components';
import {
  BillFormComponentRef,
  BillFormModes,
} from '@core/components/BillFormComponent';
import {
  AppRoutes,
  AppStackParamList,
} from '@core/navigation/PrivateStackNavigator.types';
import { useBottomSheet } from '@core/providers/BottomSheetProvider';

import { useRegisterBill } from '../hooks/useRegisterBill';
import { ConfirmExitSheet } from '../components/ConfirmExitSheet';

type Props = {
  route?: { params: AppStackParamList[AppRoutes.BILLS] };
};

function RegisterBill({ route }: Props) {
  const billType = route?.params?.billType;
  const formRef = useRef<BillFormComponentRef>(null);

  const navigation = useNavigation();
  const confirmExitSheet = useBottomSheet('confirmExitRegisterBill');
  const { onSubmit } = useRegisterBill();

  const handleTryGoBack = () => {
    formRef.current?.onFormDirty(isDirty => {
      if (!isDirty) {
        return navigation.goBack();
      } else {
        confirmExitSheet.open();
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Cadastrar Conta" onBackPress={handleTryGoBack} />
      <BillFormComponent
        ref={formRef}
        submitLabel="Cadastrar"
        mode={BillFormModes.CREATE_BILL}
        defaultValues={{ billType }}
        onSubmit={onSubmit}
      />
      <BottomSheet ref={confirmExitSheet.ref}>
        <ConfirmExitSheet
          title="Abandonar cadastro?"
          description="Você iniciou a criação de uma conta. Se sair agora, todas as informações preenchidas serão perdidas."
          emphasis="Esta ação não pode ser desfeita!"
          primaryAction={{
            label: 'Continuar',
            mode: 'outlined',
            onPress: confirmExitSheet.close,
          }}
          secondaryAction={{
            label: 'Sair sem salvar',
            onPress: navigation.goBack,
          }}
        />
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default RegisterBill;
