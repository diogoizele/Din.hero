import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon, Text } from '@shared/ui';
import { useStyled } from '@shared/hooks';
import { Theme } from '@shared/theme';
import { BottomSheet } from '@shared/components';
import { AppRoutes, AppStackNavigationProps } from '@app';
import { useBottomSheet } from '@app/providers/BottomSheetProvider';
import { useAuth } from '@features/Auth';

import MenuItem from '../components/MenuItem';
import { ConfirmExitSheet } from '../components/ConfirmExitSheet';

import { version } from '../../../../package.json';

function MenuView() {
  const [styles, theme] = useStyled(createStyles);
  const { navigate } = useNavigation<AppStackNavigationProps>();
  const { logout } = useAuth();

  const handleLogout = () => {
    confirmExitSheet.close();
    logout();
  };

  const confirmExitSheet = useBottomSheet('confirmExit');

  return (
    <SafeAreaView style={styles.safeAreaContainer} edges={['bottom']}>
      <MenuItem
        title="Histórico"
        icon={
          <Icon name="history" color={theme.colors.textSecondary} size={20} />
        }
        onPress={() => navigate(AppRoutes.HISTORY)}
      />
      <MenuItem
        title="Contas Recorrentes"
        icon={
          <Icon name="recurring" color={theme.colors.textSecondary} size={20} />
        }
        onPress={() => navigate(AppRoutes.RECURRING_RULES)}
      />
      <MenuItem
        title="Sair"
        icon={
          <Icon name="xmark" color={theme.colors.textSecondary} size={20} />
        }
        onPress={confirmExitSheet.present}
      />

      <Text color={theme.colors.textSecondary} style={styles.versionText}>
        Versão {version}
      </Text>

      <BottomSheet useModal ref={confirmExitSheet.ref}>
        <ConfirmExitSheet
          onCancel={confirmExitSheet.close}
          onConfirm={handleLogout}
        />
      </BottomSheet>
    </SafeAreaView>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    safeAreaContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    versionText: {
      textAlign: 'center',
      position: 'absolute',
      bottom: 16,
      width: '100%',
    },
  });

export default MenuView;
