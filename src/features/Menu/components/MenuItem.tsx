import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { useStyled } from '@shared/hooks';
import { Theme } from '@shared/theme';
import { Text } from '@shared/ui';

type Props = {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
};

export default function MenuItem({ title, icon, onPress }: Props) {
  const [styles] = useStyled(createStyles);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
        {icon}
      </View>
    </TouchableOpacity>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingVertical: theme.spacing(1.5),
      paddingHorizontal: theme.spacing(3),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.border,

      height: 56,
    },
    text: {
      color: theme.colors.textPrimary,
      fontSize: theme.spacing(2),
    },
  });
