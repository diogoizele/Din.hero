import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { Analytics } from '@core/analytics';
import { Button } from '@shared/ui';
import { useStyled, useNewTheme as useTheme } from '@shared/hooks/useTheme';
import {
  PublicRoutes,
  PublicStackNavigationProps,
} from '@app/navigation/PublicStackNavigator.types';
import logoImage from '@app/assets/app-logo.png';
import { TermsParamsList, TermsRoutes } from '@features/Terms';

import { SLIDES } from './constants/slides';
import { Dot } from './components/Dot';
import { Slide } from './components/Slide';
import { createStyles } from './FirstAccess.styles';
import { AuthRoutes } from '../../navigation/AuthNavigator.types';
import { DOCUMENTS } from '../../../Terms/constants/documents';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export const FirstAccess = () => {
  const theme = useTheme();
  const { top, bottom } = useSafeAreaInsets();
  const navigation = useNavigation<PublicStackNavigationProps>();
  const styles = useStyled(createStyles);

  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollX.value = event.contentOffset.x;
  });

  const handleNavigateToLogin = () => {
    Analytics.track('FIRST_ACCESS_GO_TO_LOGIN');
    navigation.navigate(PublicRoutes.AUTH, { screen: AuthRoutes.LOGIN });
  };

  const handleNavigateToCreateAccount = () => {
    Analytics.track('FIRST_ACCESS_GO_TO_SIGNUP');
    navigation.navigate(PublicRoutes.AUTH, { screen: AuthRoutes.SIGNUP });
  };

  const handleNavigateToTermsOfUseAndPrivacyPolicy = () => {
    navigation.navigate(PublicRoutes.TERMS, {
      screen: TermsRoutes.RenderPDFTerm,
      params: {
        source: { cache: true, uri: DOCUMENTS.PRIVACY_POLICY },
      } as TermsParamsList[TermsRoutes.RenderPDFTerm],
    });
  };

  return (
    <View style={styles.root}>
      <View style={[styles.hero, { paddingTop: top + theme.spacing(2) }]}>
        <Animated.View
          entering={FadeIn.delay(100).duration(600)}
          style={styles.logoBadge}>
          <Image source={logoImage} style={styles.logo} resizeMode="contain" />
        </Animated.View>

        <AnimatedScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          decelerationRate="fast"
          style={styles.carousel}>
          {SLIDES.map((slide, i) => (
            <Slide key={i} slide={slide} index={i} scrollX={scrollX} />
          ))}
        </AnimatedScrollView>
      </View>

      <View style={styles.dotsRow}>
        {SLIDES.map((_, i) => (
          <Dot key={i} index={i} scrollX={scrollX} color={theme.white} />
        ))}
      </View>

      <Animated.View
        entering={FadeInDown.springify().damping(20).stiffness(100).delay(150)}
        style={[
          styles.panel,
          { paddingBottom: Math.max(bottom, theme.spacing(8)) },
        ]}>
        <View style={styles.fields}>
          <Button
            label="Criar conta"
            fullWidth
            onPress={handleNavigateToCreateAccount}
          />
          <Button
            label="Já tenho conta"
            variant="outlined"
            fullWidth
            onPress={handleNavigateToLogin}
          />
        </View>

        <View style={styles.external}>
          <Text style={styles.externalText}>Li e concordo com os </Text>
          <TouchableOpacity
            onPress={handleNavigateToTermsOfUseAndPrivacyPolicy}>
            <Text style={styles.externalLink}>
              Termos de Uso e Política de Privacidade
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};
