import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Colors,
} from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';

import Button from '@shared/components/Button';
import logoImage from '@shared/assets/app-logo.png';
import { StatusBar, StyleSheet } from 'react-native';
import { useTheme } from '@shared/hooks/useTheme';
import {
  PublicRoutes,
  PublicStackNavigationProps,
} from '@app/navigation/PublicStackNavigator.types';



function FirstAccess() {
  const { colors } = useTheme();
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<PublicStackNavigationProps>();

  const handleNavigateToLogin = () => {
    navigation.navigate(PublicRoutes.LOGIN);
  };

  const handleNavigateToCreateAccount = () => {
    navigation.navigate(PublicRoutes.SIGNUP);
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={[styles.statusBar, { height: top }]} />
      <View
        backgroundColor={colors.primary}
        centerH
        flex-2
        paddingV-24
        paddingH-24
        style={[styles.topSideContainer, { shadowColor: colors.textPrimary }]}>
        <View flex-1 />
        <Image source={logoImage} width={170} height={171} />
        <View marginT-32 marginB-16 gap-24 flexS-1>
          <Text text50M center color={colors.white}>
            Organize pagamentos sem esforço
          </Text>
          <Text text70 center color={colors.white}>
            Cadastre contas, receba lembretes e veja o impacto real no mês.
          </Text>
        </View>
      </View>
      <View width="100%" gap-16 flex-1 paddingH-24 paddingV-32>
        <View flex-1 />
        <View width="100%" gap-12>
          <Button
            label="Criar conta"
            onPress={handleNavigateToCreateAccount}
            borderRadius={8}
          />
          <Button
            label="Já tenho conta"
            mode="outlined"
            onPress={handleNavigateToLogin}
            borderRadius={8}
          />
        </View>
        <View centerH marginB-32>
          <Text text80 center color={colors.textSecondary}>
            Li e e concordo com os{' '}
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text text80BO color={colors.primary}>
              Termos de Uso e Política de Privacidade
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    backgroundColor: Colors.primary,
  },
  topSideContainer: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 5,
  },
});

export default FirstAccess;
