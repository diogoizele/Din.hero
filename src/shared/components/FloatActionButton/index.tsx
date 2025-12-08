import { Button } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';

import Icon from '../Icon';
import { iconObjectMapper } from '../Icon/icon-object-mapper';
import { useTheme } from '../../hooks/useTheme';

interface Props {
  icon: keyof typeof iconObjectMapper;
  onPress: () => void;
}

function FloatActionButton({ icon, onPress }: Props) {
  const { borderRadiuses } = useTheme();

  return (
    <Button
      style={styles.container}
      round
      borderRadius={borderRadiuses.brRound}
      onPress={onPress}>
      <Icon name={icon} />
    </Button>
  );
}

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 36,
    right: 24,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FloatActionButton;
