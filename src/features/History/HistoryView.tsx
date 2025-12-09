import { FlatList } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '@app/components/Header';
import useHistoryViewModel from './HistoryViewModel';

function History() {
  const { sortedBills } = useHistoryViewModel();

  return (
    <SafeAreaView>
      <Header title="Histórico" />

      <FlatList
        data={sortedBills}
        renderItem={({ item }) => (
          <View>
            <Text text70M>{item.description}</Text>
            <Text text80L>{item.amount}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

export default History;
