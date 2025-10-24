import { FlatList } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { useMenuViewModel } from './MenuViewModel';

const items = [
  { id: 'history', name: 'Histórico' },
  { id: 'settings', name: 'Configurações' },
  { id: 'profile', name: 'Perfil' },
];

function MenuView() {
  const nothingYet = useMenuViewModel();

  return (
    <View useSafeArea>
      <Text text60M center>
        Menu
      </Text>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View>
            <Text text70M>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default MenuView;
