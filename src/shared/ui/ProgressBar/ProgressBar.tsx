import { memo } from 'react';
import { View } from 'react-native';

import { useStyled } from '@shared/hooks';

import { createStyles } from './ProgressBar.styles';
import { ProgressBarProps } from './ProgressBar.types';
import { useAnimation } from './useAnimations';
import Animated from 'react-native-reanimated';

const ProgressBarComponent = ({
  total,
  progress,
  variant = 'default',
}: ProgressBarProps) => {
  const [styles] = useStyled(theme => createStyles(theme, { variant }));
  const { animatedStyle } = useAnimation({ total, progress });

  return (
    <View style={styles.bar}>
      <Animated.View style={[styles.progress, animatedStyle]} />
    </View>
  );
};

export const ProgressBar = memo(ProgressBarComponent);

export default ProgressBar;
