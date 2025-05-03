import { Button } from 'react-native-ui-lib';

import Icon from '../Icon';
import { styles } from './styles';
import { iconObjectMapper } from '../Icon/icon-object-mapper';
import { useTheme } from '../../../shared/providers/ThemeProvider';

interface Props {
  icon: keyof typeof iconObjectMapper;
}

function FloatActionButton({ icon }: Props) {
  const { borderRadiuses } = useTheme();

  return (
    <Button
      style={styles.container}
      round
      borderRadius={borderRadiuses.brRound}>
      <Icon name={icon} />
    </Button>
  );
}

export default FloatActionButton;
