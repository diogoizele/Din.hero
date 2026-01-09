import { StyleSheet } from 'react-native';
import { Colors, Text } from 'react-native-ui-lib';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleProps } from 'react-native-reanimated';

import Icon, { IconName } from '@core/components/Icon';
import { useTheme } from '@core/hooks/useTheme';
import { Theme } from '@core/providers/ThemeProvider';
import Home from '@features/Home/screens/HomeView';
import MenuView from '@features/Menu/screens/MenuView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface FocusableProps {
  focused: boolean;
}

type AllowedIconNames = Extract<IconName, 'house' | 'menu'>;

const Tab = createBottomTabNavigator();

const renderIcon =
  (name: AllowedIconNames) =>
  ({ focused }: FocusableProps) => {
    const { colors } = useTheme();

    const iconSize: Record<AllowedIconNames, number> = {
      house: 20,
      menu: 24,
    };

    return (
      <Icon
        name={name}
        size={iconSize[name] || 24}
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
  const { bottom } = useSafeAreaInsets();
  const stylesWithInset = [
    styles.tabBarStyle,
    { height: bottom > 0 ? 60 + bottom : 60 },
  ];

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarStyle: stylesWithInset,
          headerShown: false,
          tabBarLabel: renderLabel('Início'),
          tabBarIcon: renderIcon('house'),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuView}
        options={{
          tabBarStyle: stylesWithInset,
          headerShown: false,
          tabBarLabel: renderLabel('Menu'),
          tabBarIcon: renderIcon('menu'),
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
    height: 60,
  },
  tabBarLabelStyle: {
    fontSize: 12,
  },
});

export default TabNavigator;
