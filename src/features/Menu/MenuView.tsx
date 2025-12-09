import { Text } from 'react-native-ui-lib';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import Icon from '@core/components/Icon';
import { useTheme } from '@core/hooks/useTheme';

import { useMenuViewModel } from './MenuViewModel';
import MenuItem from './components/MenuItem';

function MenuView() {
  const { colors } = useTheme();
  const { navigate } = useNavigation();
  const viewModel = useMenuViewModel();

  return (
    <SafeAreaView>
      <Text text60M marginV-32 center>
        Menu
      </Text>
      <MenuItem
        title="Histórico"
        icon={<Icon name="history" color={colors.primary} size={32} />}
        onPress={() => navigate('History')}
      />
    </SafeAreaView>
  );
}

export default MenuView;
