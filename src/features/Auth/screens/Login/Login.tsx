import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
  Keyboard,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TextField, Button } from '@shared/ui';
import { useStyled, useNewTheme as useTheme } from '@shared/hooks';
import logoImage from '@app/assets/app-logo.png';

import { createStyles } from './Login.styles';
import { useLogin } from './hooks/useLogin';
import { useLoginAnimations } from './hooks/useLoginAnimations';

export const Login = () => {
  const theme = useTheme();
  const { top, bottom } = useSafeAreaInsets();
  const styles = useStyled(createStyles);
  const { control, error, disableSubmit, onLogin, navigateToSignup } =
    useLogin();
  const { heroTextStyle, logoBadgeStyle, onTextLayout } = useLoginAnimations();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.root}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior={Platform.select({ ios: 'padding', android: 'height' })}>
          <Animated.View
            entering={FadeIn.delay(100).duration(600)}
            style={[styles.hero, { paddingTop: top + theme.spacing(2) }]}>
            <Animated.View style={[styles.logoBadge, logoBadgeStyle]}>
              <Image
                source={logoImage}
                style={styles.logo}
                resizeMode="contain"
              />
            </Animated.View>

            <Animated.View
              style={[styles.heroText, heroTextStyle]}
              onLayout={e => onTextLayout(e.nativeEvent.layout.height)}>
              <Text style={styles.headline}>
                Acesse seu controle{'\n'}financeiro
              </Text>
              <Text style={styles.subline}>
                Retome o acompanhamento das suas contas.
              </Text>
            </Animated.View>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.springify()
              .damping(20)
              .stiffness(100)
              .delay(150)}
            style={[
              styles.panel,
              { paddingBottom: Math.max(bottom, theme.spacing(8)) },
            ]}>
            <Animated.View
              entering={FadeInUp.duration(400).delay(300)}
              style={styles.fields}>
              <TextField.Controlled
                autoCapitalize="none"
                autoCorrect={false}
                control={control}
                name="email"
                label="E-mail"
                keyboardType="email-address"
                rules={{ required: true }}
              />
              <TextField.Controlled
                autoCapitalize="none"
                autoCorrect={false}
                control={control}
                name="password"
                label="Senha"
                secureTextEntry
                rules={{ required: true }}
              />
            </Animated.View>

            {error && (
              <Animated.Text
                entering={FadeIn.duration(300)}
                style={styles.error}>
                {error.userMessage}
              </Animated.Text>
            )}

            <Animated.View
              entering={FadeInUp.duration(400).delay(380)}
              style={styles.cta}>
              <Button
                label="Entrar"
                fullWidth
                onPress={onLogin}
                disabled={disableSubmit}
              />
              <View style={styles.signup}>
                <Text style={styles.signupText}>Não possui uma conta? </Text>
                <TouchableOpacity onPress={navigateToSignup}>
                  <Text style={styles.signupLink}>Cadastre-se</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};
