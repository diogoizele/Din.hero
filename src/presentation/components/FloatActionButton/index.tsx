import { Button } from 'react-native-ui-lib';

import Icon from '../Icon';
import { styles } from './styles';
import { iconObjectMapper } from '../Icon/icon-object-mapper';
import { useTheme } from '../../../shared/providers/ThemeProvider';

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

export default FloatActionButton;
