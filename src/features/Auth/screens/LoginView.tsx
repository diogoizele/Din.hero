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

import { TextField, Button } from '@shared/components';
import { useTheme } from '@shared/hooks/useTheme';
import logoImage from '@app/assets/app-logo.png';

import { useLogin } from '../hooks/useLogin';

function LoginView() {
  const { colors } = useTheme();
  const { top } = useSafeAreaInsets();
  const { control, error, disableSubmit, onLogin, navigateToSignup } =
    useLogin();

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      extraScrollHeight={Platform.select({ android: 140, ios: 90 })}
      scrollEnabled={false}
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
            autoCapitalize="none"
            autoCorrect={false}
            control={control}
            name="email"
            placeholder="E-mail"
            keyboardType="email-address"
            rules={{ required: true }}
          />
          <TextField
            autoCapitalize="none"
            autoCorrect={false}
            control={control}
            name="password"
            placeholder="Senha"
            secureTextEntry
            rules={{ required: true }}
          />
        </View>
        {error && (
          <Text text80BO color={colors.error} center>
            {error.userMessage}
          </Text>
        )}
        <View width="100%" marginT-16 marginB-24>
          <Button label="Entrar" onPress={onLogin} disabled={disableSubmit} />
        </View>
        <View centerH row marginB-32>
          <Text text80 center color={colors.textSecondary}>
            Não possui uma conta?{' '}
          </Text>
          <TouchableOpacity onPress={navigateToSignup}>
            <Text text80BO color={colors.primary}>
              Cadastre-se
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

export default LoginView;
