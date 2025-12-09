import { StyleSheet } from 'react-native';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';

import Icon from '../Icon';

type Props = {
  title?: string;
};

export default function Header({ title }: Props) {
  const { goBack } = useNavigation();

  return (
    <View style={[styles.headerContainer]}>
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Icon name="arrow-left" size={32} color="transparent" />
      </TouchableOpacity>
      {title && (
        <Text text60M marginL-8>
          {title}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
  },
});
