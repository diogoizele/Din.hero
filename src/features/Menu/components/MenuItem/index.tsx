import { View, Text, TouchableOpacity } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';

import { useTheme } from '@shared/hooks/useTheme';
import { applyOpacity } from '@shared/helpers/colors';

type Props = {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
};

export default function MenuItem({ title, icon, onPress }: Props) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.container,
          { borderBottomColor: applyOpacity(colors.$textNeutralLight, 0.2) },
        ]}>
        <Text text70>{title}</Text>
        {icon}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
});
