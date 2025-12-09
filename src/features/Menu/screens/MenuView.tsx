import { Text } from 'react-native-ui-lib';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import Icon from '@core/components/Icon';
import { useTheme } from '@core/hooks/useTheme';
import {
  AppRoutes,
  AppStackNavigationProps,
} from '@core/navigation/PrivateStackNavigator.types';

import MenuItem from '../components/MenuItem';
import { useAuth } from '../../Auth/hooks/useAuth';

function MenuView() {
  const { colors } = useTheme();
  const { navigate } = useNavigation<AppStackNavigationProps>();
  const { logout } = useAuth();

  return (
    <SafeAreaView>
      <Text text60M marginV-32 center>
        Menu
      </Text>
      <MenuItem
        title="Histórico"
        icon={<Icon name="history" color={colors.primary} size={32} />}
        onPress={() => navigate(AppRoutes.HISTORY)}
      />
      <MenuItem
        title="Sair"
        icon={<Icon name="close" color={colors.primary} size={32} />}
        onPress={logout}
      />
    </SafeAreaView>
  );
}

export default MenuView;
