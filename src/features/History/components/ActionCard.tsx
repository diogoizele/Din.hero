import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';

import Icon, { IconName } from '@core/components/Icon';
import { useTheme } from '@core/hooks';

type Props = {
  label: string;
  icon: {
    name: IconName;
    color: string;
  };
  onPress: () => void;
};

export const ActionCard = ({ label, icon, onPress }: Props) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View paddingV-24 paddingH-8 margin-8 style={styles.container}>
        <Icon name={icon.name} size={24} color={icon.color ?? colors.primary} />
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: 100,
    height: 100,

    borderRadius: 8,
    backgroundColor: Colors.white,

    shadowColor: Colors.textSecondary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.textPrimary,
  },
});
