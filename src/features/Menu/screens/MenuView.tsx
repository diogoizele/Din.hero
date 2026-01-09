import { Text, View } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from '@core/components/Icon';
import { useTheme } from '@core/hooks/useTheme';
import {
  AppRoutes,
  AppStackNavigationProps,
} from '@core/navigation/PrivateStackNavigator.types';

import MenuItem from '../components/MenuItem';
import { useAuth } from '../../Auth/hooks/useAuth';
import { version } from '../../../../package.json';

function MenuView() {
  const { colors } = useTheme();
  const { navigate } = useNavigation<AppStackNavigationProps>();
  const { logout } = useAuth();

  return (
    <View useSafeArea flex-1>
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

      <Text color={colors.textSecondary} style={styles.versionText}>
        Versão {version}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  versionText: {
    textAlign: 'center',
    position: 'absolute',
    bottom: 16,
    width: '100%',
  },
});

export default MenuView;
