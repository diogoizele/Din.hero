import { StyleSheet } from 'react-native';
import { Colors, Text, View, TouchableOpacity } from 'react-native-ui-lib';

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
  const { colors, shadows } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      margin-8
      paddingH-8
      style={[styles.container, shadows.medium]}>
      <Icon name={icon.name} size={24} color={icon.color ?? colors.primary} />
      <Text style={styles.label}>{label}</Text>
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
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.textPrimary,
  },
});
