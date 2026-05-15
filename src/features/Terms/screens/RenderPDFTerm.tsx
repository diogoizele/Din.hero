import { StyleSheet, ActivityIndicator } from 'react-native';
import { SystemBars } from 'react-native-edge-to-edge';
import { SafeAreaView } from 'react-native-safe-area-context';
import Pdf from 'react-native-pdf';

import { Theme } from '@shared/theme';
import { useStyled } from '@shared/hooks';

import {
  TermsRoutes,
  TermsScreenProps,
} from '../navigation/TermsNavigator.types';

export function RenderPDFTerm({
  route,
}: TermsScreenProps<TermsRoutes.RenderPDFTerm>) {
  const [styles] = useStyled(createStyle);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <SystemBars style="dark" hidden={{ navigationBar: true }} />
      <Pdf
        source={route?.params?.source}
        trustAllCerts={false}
        enableDoubleTapZoom
        renderActivityIndicator={() => <ActivityIndicator size="large" />}
        style={styles.pdf}
      />
    </SafeAreaView>
  );
}

const createStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
    pdf: {
      flex: 1,
      width: '100%',
      backgroundColor: theme.colors.white,
    },
  });
