import { PropsWithChildren } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { useStyled } from '../src/shared/hooks/useTheme';
import { ScrollView } from 'react-native-gesture-handler';
import { SystemBars } from 'react-native-edge-to-edge';

type Props = PropsWithChildren<{
  style?: ViewStyle;
}>;

export function Container({ children, style }: Props) {
  const [styles, theme] = useStyled(createStyles);
  const statusBarStyle = theme.mode === 'dark' ? 'light' : 'dark';

  return (
    <ScrollView style={[styles.scrollView, style]}>
      <SystemBars style={statusBarStyle} />
      <View style={[styles.container]}>{children}</View>
    </ScrollView>
  );
}

const createStyles = (theme: ReturnType<typeof useStyled>[1]) =>
  StyleSheet.create({
    scrollView: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
      paddingVertical: 64,
      justifyContent: 'center',
    },
  });
