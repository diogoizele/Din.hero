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
import { Icon } from '@shared/components';
import logoImage from '@app/assets/app-logo.png';

import { createStyles } from './Signup.styles';

import { useSignupAnimations } from './hooks/useSignupAnimations';
import { useSignup } from './hooks/useSignup';

export const Signup = () => {
  const theme = useTheme();
  const { top, bottom } = useSafeAreaInsets();
  const styles = useStyled(createStyles);
  const { control, error, errors, shakeStyle, onSignup, navigateToLogin } =
    useSignup();
  const { heroStyle } = useSignupAnimations();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.root}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior={Platform.select({ ios: 'padding', android: 'height' })}>
          <Animated.View
            entering={FadeIn.delay(100).duration(600)}
            style={[styles.hero, { paddingTop: top }, heroStyle]}>
            <Animated.View style={[styles.logoBadge]}>
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
                autoCapitalize="none"
                autoCorrect={false}
                control={control}
                name="name"
                label="Nome"
                rules={{ required: true }}
                error={!!errors.name?.message}
                errorMessage={errors.name?.message}
                animatedStyle={shakeStyle}
              />
              <TextField.Controlled
                autoCapitalize="none"
                autoCorrect={false}
                control={control}
                name="email"
                label="E-mail"
                keyboardType="email-address"
                rules={{ required: true }}
                error={!!errors.email?.message}
                errorMessage={errors.email?.message}
                animatedStyle={shakeStyle}
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
              />
            </Animated.View>

            {error && (
              <Animated.View
                style={styles.errorContainer}
                entering={FadeIn.duration(300)}>
                <Icon name="close" color={theme.colors.surface} size={20} />
                <Text style={styles.error}>{error?.userMessage}</Text>
              </Animated.View>
            )}
            <Animated.View
              entering={FadeInUp.duration(400).delay(380)}
              style={styles.cta}>
              <Button label="Entrar" fullWidth onPress={onSignup} />
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
};
