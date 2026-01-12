import { StyleSheet } from 'react-native';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';

import Icon from '../Icon';
import { useTheme } from '../../hooks';

type Props = {
  title?: string;
  rightComponent?: React.ReactNode;
};

export default function Header({ title, rightComponent }: Props) {
  const { goBack } = useNavigation();
  const { colors } = useTheme();

  return (
    <View style={[styles.headerContainer]}>
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Icon name="angle-left" size={22} color={colors.primary} />
      </TouchableOpacity>
      {title && (
        <Text text60M marginL-8>
          {title}
        </Text>
      )}
      <View flex style={styles.rightComponent}>
        {rightComponent}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
    marginLeft: 8,
  },
  rightComponent: {
    position: 'absolute',
    right: 8,
  },
});
