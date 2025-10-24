import { FlatList } from 'react-native';
import { Text, View } from 'react-native-ui-lib';

import useHistoryViewModel from './HistoryViewModel';

function History() {
  const { sortedBills } = useHistoryViewModel();

  return (
    <View useSafeArea>
      <Text text60M center>
        Histórico
      </Text>
      <FlatList
        data={sortedBills}
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
