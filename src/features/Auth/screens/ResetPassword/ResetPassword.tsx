// RecoverPassword.tsx
import { useCallback, useDeferredValue } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Image,
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

import { ErrorBanner } from '../../components/ErrorBanner';
import { createStyles } from './ResetPassword.styles';
import { useResetPassword } from './hooks/useResetPassword';
import { useHeroAnimations } from '../../hooks/useHeroAnimations';
import {
  AuthRoutes,
  AuthScreenProps,
} from '../../navigation/AuthNavigator.types';

export const ResetPassword = ({
  route,
}: AuthScreenProps<AuthRoutes.RESET_PASSWORD>) => {
  const theme = useTheme();
  const styles = useStyled(createStyles);
  const { bottom, top } = useSafeAreaInsets();

  const {
    control,
    errors,
    shakeStyle,
    error,
    success,
    isLoading,
    onSubmit,
    goBackToLogin,
  } = useResetPassword({ email: route.params?.email });

  const { heroTextStyle, logoBadgeStyle, onTextLayout } = useHeroAnimations();
  const deferredError = useDeferredValue(error);

  const dismiss = useCallback(() => Keyboard.dismiss(), []);

  return (
    <TouchableWithoutFeedback onPress={dismiss} accessible={false}>
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
              <Text style={styles.headline}>Recuperar acesso</Text>
              <Text style={styles.subline}>
                Informe seu e-mail para envio do link de redefinição.
              </Text>
            </Animated.View>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.springify().delay(100)}
            style={[
              styles.panel,
              { paddingBottom: Math.max(bottom, theme.spacing(8)) },
            ]}>
            <Animated.View entering={FadeInUp.duration(300)}>
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
            </Animated.View>

            <ErrorBanner error={deferredError} colors={theme.colors} />

            {success && (
              <Animated.View entering={FadeInUp.duration(300)}>
                <Text style={styles.success}>
                  Se o e-mail existir, um link foi enviado.
                </Text>
              </Animated.View>
            )}

            <Animated.View
              entering={FadeInUp.duration(400).delay(200)}
              style={styles.cta}>
              <Button
                label="Enviar link"
                fullWidth
                onPress={onSubmit}
                loading={isLoading}
              />
              <Button
                label="Voltar ao login"
                fullWidth
                variant="outlined"
                onPress={goBackToLogin}
                disabled={isLoading}
              />
            </Animated.View>
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};
