import { memo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@shared/ui';
import { useStyled, useNewTheme as useTheme } from '@shared/hooks/useTheme';
import logoImage from '@app/assets/app-logo.png';

import { SLIDES } from './constants/slides';
import { Dot } from './components/Dot';
import { Slide } from './components/Slide';
import { createStyles } from './FirstAccess.styles';
import { useFirstAccess } from './hooks/useFirstAccess';

export const FirstAccess = memo(() => {
  const theme = useTheme();
  const { top, bottom } = useSafeAreaInsets();
  const styles = useStyled(createStyles);
  const {
    scrollRef,
    scrollX,
    scrollHandler,
    dotPressHandlers,
    handleScrollBeginDrag,
    handleMomentumScrollEnd,
    handleNavigateToLogin,
    handleNavigateToCreateAccount,
    handleNavigateToTerms,
  } = useFirstAccess();

  return (
    <View style={styles.root}>
      <View style={[styles.hero, { paddingTop: top + theme.spacing(2) }]}>
        <Animated.View
          entering={FadeIn.delay(100).duration(600)}
          style={styles.logoBadge}>
          <Image source={logoImage} style={styles.logo} resizeMode="contain" />
        </Animated.View>

        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          decelerationRate="fast"
          removeClippedSubviews
          onScrollBeginDrag={handleScrollBeginDrag}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          style={styles.carousel}>
          {SLIDES.map((slide, i) => (
            <Slide
              key={slide.headline}
              slide={slide}
              index={i}
              scrollX={scrollX}
            />
          ))}
        </Animated.ScrollView>
      </View>

      <View style={styles.dotsRow}>
        {SLIDES.map((_, i) => (
          <Dot
            key={i}
            index={i}
            scrollX={scrollX}
            color={theme.white}
            onPress={dotPressHandlers[i]}
          />
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
          <TouchableOpacity onPress={handleNavigateToTerms}>
            <Text style={styles.externalLink}>
              Termos de Uso e Política de Privacidade
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
});
