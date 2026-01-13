import { Text, View } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Icon from '@core/components/Icon';
import { useTheme } from '@core/hooks/useTheme';
import {
  AppRoutes,
  AppStackNavigationProps,
} from '@core/navigation/PrivateStackNavigator.types';
import { BottomSheet } from '@core/components';
import { useBottomSheet } from '@core/providers/BottomSheetProvider';
import { useAuth } from '@features/Auth/hooks/useAuth';

import MenuItem from '../components/MenuItem';
import { version } from '../../../../package.json';
import { ConfirmExitSheet } from '../components/ConfirmExitSheet';

function MenuView() {
  const { colors } = useTheme();
  const { navigate } = useNavigation<AppStackNavigationProps>();
  const { logout } = useAuth();

  const confirmExitSheet = useBottomSheet('confirmExit');

  return (
    <SafeAreaView
      style={{ flex: 1 }}
      edges={['top', 'bottom', 'left', 'right']}>
      <Text text60M marginV-32 center>
        Menu
      </Text>
      <MenuItem
        title="Histórico"
        icon={<Icon name="history" color={colors.primary} size={32} />}
        onPress={() => navigate(AppRoutes.HISTORY)}
      />
      <MenuItem
        title="Contas Recorrentes"
        icon={<Icon name="recurring" color={colors.primary} size={26} />}
        onPress={() => navigate(AppRoutes.RECURRING_RULES)}
      />
      <MenuItem
        title="Sair"
        icon={<Icon name="close" color={colors.primary} size={32} />}
        onPress={confirmExitSheet.present}
      />

      <Text color={colors.textSecondary} style={styles.versionText}>
        Versão {version}
      </Text>

      <BottomSheet useModal ref={confirmExitSheet.ref}>
        <ConfirmExitSheet
          onCancel={confirmExitSheet.close}
          onConfirm={logout}
        />
      </BottomSheet>
    </SafeAreaView>
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
