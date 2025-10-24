import { StyleSheet } from 'react-native';
import { Colors, Text } from 'react-native-ui-lib';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleProps } from 'react-native-reanimated';

import { Theme } from '../theme/ThemeProvider';
import Icon, { IconName } from '../components/Icon';
import History from '../screens/History/HistoryView';
import Home from '../screens/Home/HomeView';
import { useTheme } from '../hooks/useTheme';

interface FocusableProps {
  focused: boolean;
}

const Tab = createBottomTabNavigator();

const renderIcon =
  (name: IconName) =>
  ({ focused }: FocusableProps) => {
    const { colors } = useTheme();
    return (
      <Icon
        name={name}
        size={24}
        opacity={focused ? 1 : 0.8}
        color={focused ? colors.primary : colors.textSecondary}
      />
    );
  };

const getTabBarLabelStyle = (
  focused: boolean,
  colors: Theme['colors'],
): StyleProps[] => [
  styles.tabBarLabelStyle,
  {
    fontWeight: focused ? '600' : '400',
    opacity: focused ? 1 : 0.89,
    color: focused ? colors.primary : colors.textSecondary,
  },
];

const renderLabel =
  (label: string) =>
  ({ focused }: FocusableProps) => {
    const { colors } = useTheme();

    return (
      <Text
        text70
        color={focused ? colors.primary : colors.textSecondary}
        style={getTabBarLabelStyle(focused, colors)}>
        {label}
      </Text>
    );
  };

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarStyle: styles.tabBarStyle,
          headerShown: false,
          tabBarLabel: renderLabel('Início'),
          tabBarIcon: renderIcon('home'),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarStyle: styles.tabBarStyle,
          headerShown: false,
          tabBarLabel: renderLabel('Histórico'),
          tabBarIcon: renderIcon('history'),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    shadowColor: Colors.textPrimary,
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  tabBarLabelStyle: {
    fontSize: 12,
  },
});

export default TabNavigator;
