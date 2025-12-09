import { PropsWithChildren, useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const duration = 300;

export interface AnimatedVisibilityProps extends PropsWithChildren {
  isVisible: boolean;
  onShow?: () => void;
  onHide?: () => void;
}

function AnimatedVisibility({
  isVisible,
  onHide,
  onShow,
  children,
}: AnimatedVisibilityProps) {
  const translateY = useSharedValue(50);

  const show = () => {
    translateY.value = withTiming(0, { duration }, onShow);
  };

  const hide = () => {
    translateY.value = withTiming(50, { duration }, onHide);
  };

  const animatedViewStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    if (isVisible) {
      show();
    } else {
      hide();
    }
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return <Animated.View style={animatedViewStyle}>{children}</Animated.View>;
}

export default AnimatedVisibility;
