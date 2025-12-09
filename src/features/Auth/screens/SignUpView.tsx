import { Platform, StatusBar, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm } from 'react-hook-form';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Colors,
} from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';

import Button from '@app/components/Button';
import logoImage from '@shared/assets/app-logo.png';
import { useTheme } from '@app/hooks/useTheme';
import TextField from '@app/components/TextField';
import {
  PublicRoutes,
  PublicStackNavigationProps,
} from 'src/core/navigation/PublicStackNavigator.types';

type LoginForm = {
  email: string;
  password: string;
};

function SignUpView() {
  const { colors } = useTheme();
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<PublicStackNavigationProps>();

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    setError,
  } = useForm<LoginForm>();

  const handleNavigateToLogin = () => {
    navigation.navigate(PublicRoutes.LOGIN);
  };

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
          <TextField control={control} name="name" placeholder="Nome" />
          <TextField control={control} name="email" placeholder="E-mail" />
          <TextField
            control={control}
            name="password"
            placeholder="Senha"
            secureTextEntry
          />
        </View>
        <View width="100%" marginT-16 marginB-24>
          <Button label="Entrar" onPress={handleSubmit} />
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
