import { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';

import { ProgressBarProps } from './ProgressBar.types';

export function useAnimation({ progress, total }: Required<Pick<ProgressBarProps, 'total' | 'progress'>>) {
  const percentage = useDerivedValue(() => {
    const value =
      total > 0 ? Math.min(progress / total, 1) : 0;

    return withTiming(value, {
      duration: 400,
    });
  }, [progress, total]);
  const animatedStyle = useAnimatedStyle(() => ({
    width: `${percentage.value * 100}%`,
  }));

  return {
    animatedStyle,
  };
}
