import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, Icon } from '@shared/ui';
import { IconName } from '@shared/ui/Icon';
import { Theme } from '@shared/theme';
import { useStyled } from '@shared/hooks';

type Props = {
  label: string;
  icon: {
    name: IconName;
    color: string;
  };
  onPress: () => void;
};

export const ActionCard = ({ label, icon, onPress }: Props) => {
  const [styled, theme] = useStyled(createStyles);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styled.container}>
      <Icon
        name={icon.name}
        size={24}
        color={icon.color ?? theme.colors.brand}
      />
      <Text style={styled.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      width: 100,
      height: 100,

      borderRadius: 8,
      backgroundColor: theme.colors.surface,

      ...theme.shadow.card,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      textAlign: 'center',
      color: theme.colors.textPrimary,
    },
  });
