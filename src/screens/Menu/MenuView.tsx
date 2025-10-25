import { Text } from 'react-native-ui-lib';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { useMenuViewModel } from './MenuViewModel';
import MenuItem from './components/MenuItem';
import Icon from '../../components/Icon';
import { useTheme } from '../../hooks/useTheme';
import { NavigationProps } from '../../routes/RootStackNavigator';

function MenuView() {
  const { colors } = useTheme();
  const { navigate } = useNavigation<NavigationProps>();
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
