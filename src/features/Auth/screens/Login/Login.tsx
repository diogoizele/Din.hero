import { useCallback, useDeferredValue } from 'react';
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
import { useStyled } from '@shared/hooks';
import logoImage from '@app/assets/app-logo.png';

import { createStyles } from './Login.styles';
import { useLogin } from './hooks/useLogin';
import {
  AuthRoutes,
  AuthScreenProps,
} from '../../navigation/AuthNavigator.types';
import { ErrorBanner } from '../../components/ErrorBanner';
import { useHeroAnimations } from '../../hooks/useHeroAnimations';

export const Login = ({ route }: AuthScreenProps<AuthRoutes.LOGIN>) => {
  const [styles, theme] = useStyled(createStyles);
  const { top, bottom } = useSafeAreaInsets();
  const {
    control,
    error,
    errors,
    shakeStyle,
    isLoading,
    onLogin,
    navigateToSignup,
    navigateToResetPassword,
  } = useLogin({ email: route.params?.email });
  const { heroTextStyle, logoBadgeStyle, onTextLayout } = useHeroAnimations();

  const deferredError = useDeferredValue(error);

  const handleDismiss = useCallback(() => Keyboard.dismiss(), []);

  return (
    <TouchableWithoutFeedback onPress={handleDismiss} accessible={false}>
      <View style={styles.root}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior={Platform.select({ ios: 'padding', android: 'height' })}>
          <Animated.View
            entering={FadeIn.delay(100).duration(600)}
            style={[styles.hero, { paddingTop: top + theme.spacing(1) }]}>
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
            <Animated.View entering={FadeInUp.duration(400).delay(300)}>
              <TextField.Controlled
                control={control}
                name="email"
                label="E-mail"
                keyboardType="email-address"
                rules={{ required: true }}
                error={!!errors.email?.message}
                errorMessage={errors.email?.message}
                animatedStyle={shakeStyle}
                disabled={isLoading}
              />
              <TextField.Controlled
                control={control}
                name="password"
                label="Senha"
                secureTextEntry
                rules={{ required: true }}
                error={!!errors.password?.message}
                errorMessage={errors.password?.message}
                animatedStyle={[shakeStyle, styles.fieldSpacing]}
                disabled={isLoading}
              />
              <TouchableOpacity
                style={styles.forgetPasswordTouchable}
                onPress={navigateToResetPassword}>
                <Text style={styles.externalLink}>Esqueceu sua senha?</Text>
              </TouchableOpacity>
            </Animated.View>

            <ErrorBanner error={deferredError} colors={theme.colors} />

            <Animated.View
              entering={FadeInUp.duration(400).delay(380)}
              style={styles.cta}>
              <Button
                label={isLoading ? 'Entrando...' : 'Entrar'}
                fullWidth
                onPress={onLogin}
                loading={isLoading}
              />
              <View style={styles.external}>
                <Text style={styles.externalText}>Não possui uma conta? </Text>
                <TouchableOpacity onPress={navigateToSignup}>
                  <Text style={styles.externalLink}>Cadastre-se</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};
