import { PropsWithChildren } from 'react';
import { SafeAreaView, StyleSheet, View, ViewStyle } from 'react-native';

import { useStyled } from '../src/shared/hooks/useTheme';
import { ScrollView } from 'react-native-gesture-handler';

type Props = PropsWithChildren<{
  style: ViewStyle;
}>;

export function Container({ children, style }: Props) {
  const styles = useStyled(theme =>
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
    }),
  );
  return (
    <ScrollView style={[styles.scrollView, style]}>
      <View style={[styles.container]}>{children}</View>
    </ScrollView>
  );
}
