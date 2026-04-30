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
import { Icon } from '../../../../shared/components';

export const Login = () => {
  const theme = useTheme();
  const { top, bottom } = useSafeAreaInsets();
  const styles = useStyled(createStyles);
  const { control, error, errors, shakeStyle, onLogin, navigateToSignup } =
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
            <Animated.View
              entering={FadeInUp.duration(400).delay(300)}
              style={styles.fields}>
              <TextField.Controlled
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
              <Button label="Entrar" fullWidth onPress={onLogin} />
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
