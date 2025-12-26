import { useEffect, useRef } from 'react';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Colors,
} from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';

import Button from '@core/components/Button';
import logoImage from '@core/assets/app-logo.png';
import { useTheme } from '@core/hooks/useTheme';
import TextField from '@core/components/TextField';
import {
  PublicRoutes,
  PublicStackNavigationProps,
} from '@core/navigation/PublicStackNavigator.types';

import { useSignUpForm } from '../hooks/useSignUpForm';
import { useAppSelector } from '../../../core/hooks';
import { useLoading } from '../../../core/providers/LoadingProvider';

function SignUpView() {
  const { colors } = useTheme();
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<PublicStackNavigationProps>();
  const { control, errors, handleSubmit } = useSignUpForm();
  const status = useAppSelector(state => state.auth.status);
  const { setIsLoading } = useLoading();

  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);

  const handleNavigateToLogin = () => {
    navigation.navigate(PublicRoutes.LOGIN);
  };

  useEffect(() => {
    setIsLoading(status === 'loading');
  }, [status]);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd(false);
  }, []);

  return (
    <KeyboardAwareScrollView
      ref={scrollViewRef}
      enableOnAndroid={true}
      extraScrollHeight={Platform.select({ android: 140, ios: 90 })}
      scrollEnabled={Platform.OS === 'android'}
      keyboardShouldPersistTaps="handled">
      <StatusBar barStyle="light-content" />
      <View style={[styles.statusBar, { height: top }]} />
      <View
        backgroundColor={colors.primary}
        centerH
        paddingV-24
        paddingH-24
        style={[styles.topSideContainer, { shadowColor: colors.textPrimary }]}>
        <Image source={logoImage} width={83} height={84} marginT-64 />
        <View marginT-32 marginB-16 gap-24 flexS-1>
          <Text text50M center color={colors.white}>
            Acesse seu controle financeiro
          </Text>
          <Text text70 center color={colors.white}>
            Retome o acompanhamento das suas contas.
          </Text>
        </View>
      </View>
      <View width="100%" gap-16 paddingH-24 paddingV-32>
        <View width="100%" gap-24>
          <TextField
            control={control}
            name="name"
            placeholder="Nome"
            error={errors.name?.message}
          />
          <TextField
            control={control}
            name="email"
            placeholder="E-mail"
            error={errors.email?.message}
          />
          <TextField
            control={control}
            name="password"
            placeholder="Senha"
            secureTextEntry
            error={errors.password?.message}
          />
        </View>
        <View width="100%" marginT-16 marginB-24>
          <Button label="Cadastrar" onPress={handleSubmit} />
        </View>
        <View centerH row marginB-32>
          <Text text80 center color={colors.textSecondary}>
            Já possui uma conta?{' '}
          </Text>
          <TouchableOpacity onPress={handleNavigateToLogin}>
            <Text text80BO color={colors.primary}>
              Entrar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    backgroundColor: Colors.primary,
  },
  topSideContainer: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 5,
  },
});

export default SignUpView;
