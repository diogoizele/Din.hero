import { FlatList } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import useBills from '../../../shared/hooks/useBills';

function History() {
  const { bills } = useBills();

  return (
    <View useSafeArea>
      <Text text60M center>
        Histórico
      </Text>
      <FlatList
        data={bills}
        renderItem={({ item }) => (
          <View>
            <Text text70M>{item.description}</Text>
            <Text text80L>{item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default History;
