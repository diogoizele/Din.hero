import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  AppState,
  InteractionManager,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import Animated, {
  runOnUI,
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { Analytics } from '@core/analytics';
import {
  PublicRoutes,
  PublicStackNavigationProps,
} from '@app/navigation/PublicStackNavigator.types';
import { TermsParamsList, TermsRoutes } from '@features/Terms';
import { DOCUMENTS } from '@features/Terms/constants/documents';

import { SCREEN_WIDTH } from '../constants/layout';
import { SLIDES } from '../constants/slides';
import { AuthRoutes } from '../../../navigation/AuthNavigator.types';

const AUTO_SCROLL_INTERVAL_MS = 4000;
const SLIDE_COUNT = SLIDES.length;

export function useFirstAccess() {
  const navigation = useNavigation<PublicStackNavigationProps>();

  // useAnimatedRef permite scrollTo rodar direto na UI thread via Reanimated,
  // eliminando a passagem pelo JS bridge a cada scroll programático.
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollX = useSharedValue(0);

  const currentIndexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isUserScrollingRef = useRef(false);

  // ─── Scroll ────────────────────────────────────────────────────────────────

  const scrollToIndex = useCallback(
    (index: number) => {
      currentIndexRef.current = index;
      runOnUI((targetIndex: number) => {
        scrollTo(scrollRef, targetIndex * SCREEN_WIDTH, 0, true);
      })(index);
    },
    [scrollRef],
  );

  // Handler totalmente na UI thread via worklet nativo do Reanimated.
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });

  // ─── Auto-scroll ───────────────────────────────────────────────────────────

  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (isUserScrollingRef.current) {
        return;
      }
      const next = (currentIndexRef.current + 1) % SLIDE_COUNT;
      scrollToIndex(next);
    }, AUTO_SCROLL_INTERVAL_MS);
  }, [scrollToIndex]);

  const stopAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Inicia/para com o foco da tela — cobre navegação pra frente e retorno.
  useFocusEffect(
    useCallback(() => {
      startAutoScroll();
      return stopAutoScroll;
    }, [startAutoScroll, stopAutoScroll]),
  );

  // Pausa quando o app vai para background.
  useEffect(() => {
    const sub = AppState.addEventListener('change', state => {
      if (state === 'active') {
        startAutoScroll();
      } else {
        stopAutoScroll();
      }
    });
    return () => sub.remove();
  }, [startAutoScroll, stopAutoScroll]);

  // ─── Eventos de scroll manual ──────────────────────────────────────────────

  const handleScrollBeginDrag = useCallback(() => {
    isUserScrollingRef.current = true;
    stopAutoScroll();
  }, [stopAutoScroll]);

  const handleMomentumScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      isUserScrollingRef.current = false;
      currentIndexRef.current = Math.round(
        e.nativeEvent.contentOffset.x / SCREEN_WIDTH,
      );
      startAutoScroll();
    },
    [startAutoScroll],
  );

  // ─── Handlers de dots ─────────────────────────────────────────────────────

  // Pré-criados para não gerar novas referências a cada render do pai.
  const dotPressHandlers = useMemo(
    () => SLIDES.map((_, i) => () => scrollToIndex(i)),
    [scrollToIndex],
  );

  // ─── Navegação ─────────────────────────────────────────────────────────────

  const handleNavigateToLogin = useCallback(() => {
    // Analytics fora do frame de transição para não bloquear a animação.
    InteractionManager.runAfterInteractions(() => {
      Analytics.track('FIRST_ACCESS_GO_TO_LOGIN');
    });
    navigation.navigate(PublicRoutes.AUTH, { screen: AuthRoutes.LOGIN });
  }, [navigation]);

  const handleNavigateToCreateAccount = useCallback(() => {
    InteractionManager.runAfterInteractions(() => {
      Analytics.track('FIRST_ACCESS_GO_TO_SIGNUP');
    });
    navigation.navigate(PublicRoutes.AUTH, { screen: AuthRoutes.SIGNUP });
  }, [navigation]);

  const handleNavigateToTerms = useCallback(() => {
    navigation.navigate(PublicRoutes.TERMS, {
      screen: TermsRoutes.RenderPDFTerm,
      params: {
        source: { cache: true, uri: DOCUMENTS.PRIVACY_POLICY },
      } as TermsParamsList[TermsRoutes.RenderPDFTerm],
    });
  }, [navigation]);

  return {
    scrollRef,
    scrollX,
    scrollHandler,
    dotPressHandlers,
    handleScrollBeginDrag,
    handleMomentumScrollEnd,
    handleNavigateToLogin,
    handleNavigateToCreateAccount,
    handleNavigateToTerms,
  };
}
