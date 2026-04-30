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

import { createStyles } from './Signup.styles';

import { useSignupAnimations } from './hooks/useSignupAnimations';
import { useSignup } from './hooks/useSignup';

export const Signup = () => {
  const theme = useTheme();
  const { top, bottom } = useSafeAreaInsets();
  const styles = useStyled(createStyles);
  const { control, onSignup, navigateToLogin } = useSignup();
  const { heroStyle } = useSignupAnimations();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.root}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior={Platform.select({ ios: 'padding', android: 'height' })}>
          <Animated.View
            entering={FadeIn.delay(100).duration(600)}
            style={[
              styles.hero,
              { paddingTop: top + theme.spacing(2) },
              heroStyle,
            ]}>
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
              />
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

            {/* {error && (
              <Animated.Text
                entering={FadeIn.duration(300)}
                style={styles.error}>
                {error.userMessage}
              </Animated.Text>
            )} */}

            <Animated.View
              entering={FadeInUp.duration(400).delay(380)}
              style={styles.cta}>
              <Button
                label="Entrar"
                fullWidth
                onPress={onSignup}
                // disabled={disableSubmit}
              />
              <View style={styles.signup}>
                <Text style={styles.signupText}>Já possui uma conta? </Text>
                <TouchableOpacity onPress={navigateToLogin}>
                  <Text style={styles.signupLink}>Entrar</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};
