import React, { useCallback, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements';
import { NativeStackHeaderLeftProps } from '@react-navigation/native-stack';

import { BillFormComponent, BottomSheet } from '@shared/components';
import { Theme } from '@shared/theme';
import { useStyled } from '@shared/hooks';
import {
  BillFormComponentRef,
  BillFormModes,
} from '@shared/components/BillFormComponent';
import {
  AppRoutes,
  AppStackScreenProps,
} from '@app/navigation/AppStackNavigator.types';
import { useBottomSheet } from '@app/providers/BottomSheetProvider';

import { useRegisterBill } from '../hooks/useRegisterBill';
import { ConfirmExitSheet } from '../components/ConfirmExitSheet';

function RegisterBill({
  route,
  navigation,
}: AppStackScreenProps<AppRoutes.BILLS>) {
  const billType = route?.params?.billType;
  const formRef = useRef<BillFormComponentRef>(null);
  const [styles] = useStyled(createStyles);

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

  const renderHeaderLeft = useCallback((props: NativeStackHeaderLeftProps) => {
    return <HeaderBackButton {...props} onPress={handleTryGoBack} />;
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
    });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
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

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  });

export default RegisterBill;
