import { Text } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuthStore } from '@features/Auth';
import Icon from '@shared/components/Icon';
import { useTheme } from '@shared/hooks/useTheme';
import { AppRoutes, AppStackNavigationProps } from '@app';
import { BottomSheet } from '@shared/components';
import { useBottomSheet } from '@app/providers/BottomSheetProvider';

import MenuItem from '../components/MenuItem';
import { ConfirmExitSheet } from '../components/ConfirmExitSheet';

import { version } from '../../../../package.json';

function MenuView() {
  const { colors } = useTheme();
  const { navigate } = useNavigation<AppStackNavigationProps>();
  const logout = useAuthStore(state => state.logout);

  const confirmExitSheet = useBottomSheet('confirmExit');

  return (
    <SafeAreaView
      style={styles.safeAreaContainer}
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
  safeAreaContainer: {
    flex: 1,
  },
  versionText: {
    textAlign: 'center',
    position: 'absolute',
    bottom: 16,
    width: '100%',
  },
});

export default MenuView;
