import React, { memo, useCallback, useDeferredValue } from 'react';
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
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TextField, Button } from '@shared/ui';
import { useStyled, useNewTheme as useTheme } from '@shared/hooks';
import logoImage from '@app/assets/app-logo.png';

import { createStyles } from './Signup.styles';
import { useSignupAnimations } from './hooks/useSignupAnimations';
import { useSignup } from './hooks/useSignup';
import { ErrorBanner } from '../../components/ErrorBanner';

export const Signup = memo(() => {
  const theme = useTheme();
  const { top, bottom } = useSafeAreaInsets();
  const styles = useStyled(createStyles);

  const {
    control,
    error,
    errors,
    shakeStyle,
    isLoading,
    onSignup,
    navigateToLogin,
  } = useSignup();
  const { heroStyle } = useSignupAnimations();

  const deferredError = useDeferredValue(error);

  const handleDismiss = useCallback(() => Keyboard.dismiss(), []);

  return (
    <TouchableWithoutFeedback onPress={handleDismiss} accessible={false}>
      <View style={styles.root}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior={Platform.select({ ios: 'padding', android: 'height' })}>
          <Animated.View style={[styles.hero, { paddingTop: top }, heroStyle]}>
            <Animated.View style={styles.logoBadge}>
              <Image
                source={logoImage}
                style={styles.logo}
                resizeMode="contain"
              />
            </Animated.View>
            <Animated.View style={styles.heroText}>
              <Text style={styles.headline}>
                Comece seu controle{'\n'}financeiro
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
                autoCapitalize="words"
                autoCorrect={false}
                control={control}
                name="name"
                label="Nome"
                rules={{ required: true }}
                error={!!errors.name?.message}
                errorMessage={errors.name?.message}
                animatedStyle={shakeStyle}
                disabled={isLoading}
              />
              <TextField.Controlled
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                control={control}
                name="email"
                label="E-mail"
                keyboardType="email-address"
                textContentType="emailAddress"
                rules={{ required: true }}
                error={!!errors.email?.message}
                errorMessage={errors.email?.message}
                animatedStyle={shakeStyle}
                disabled={isLoading}
              />
              <TextField.Controlled
                autoCapitalize="none"
                autoCorrect={false}
                control={control}
                name="password"
                label="Senha"
                secureTextEntry
                rules={{ required: true }}
                error={!!errors.password?.message}
                errorMessage={errors.password?.message}
                animatedStyle={shakeStyle}
                disabled={isLoading}
              />
            </Animated.View>

            <ErrorBanner error={deferredError} colors={theme.colors} />

            <Animated.View
              entering={FadeInUp.duration(400).delay(380)}
              style={styles.cta}>
              <Button
                label="Criar conta"
                fullWidth
                onPress={onSignup}
                loading={isLoading}
              />
              <View style={styles.external}>
                <Text style={styles.externalText}>Já possui uma conta? </Text>
                <TouchableOpacity onPress={navigateToLogin}>
                  <Text style={styles.externalLink}>Entrar</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
});
