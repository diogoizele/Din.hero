import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Icon, { IconName } from '@shared/components/Icon';
import { useStyled, useTheme } from '@shared/hooks';
import { Theme } from '@shared/theme';
import { Text } from '@shared/ui';
import MenuView from '@features/Menu/screens/MenuView';
import Home from '@features/Home/screens/Home/Home';

import { AppRoutes } from './AppStackNavigator.types';
import { applyOpacity } from '../../shared/helpers/colors';

const HEIGHT = 42;

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
        color={focused ? colors.brand : colors.textSecondary}
      />
    );
  };

const getTabBarLabelStyle = (focused: boolean, colors: Theme['colors']) =>
  ({
    fontWeight: focused ? '600' : '400',
    opacity: focused ? 1 : 0.89,
    color: focused ? colors.brand : colors.textSecondary,
  } as const);

const renderLabel =
  (label: string) =>
  ({ focused }: FocusableProps) => {
    const { colors } = useTheme();

    return (
      <Text
        color={focused ? colors.brand : colors.textSecondary}
        style={getTabBarLabelStyle(focused, colors)}>
        {label}
      </Text>
    );
  };

function TabNavigator() {
  const { bottom } = useSafeAreaInsets();
  const [styles] = useStyled(createStyles);

  const stylesWithInset = [
    styles.tabBarStyle,
    { height: Math.max(HEIGHT + bottom, HEIGHT) },
  ];

  return (
    <Tab.Navigator>
      <Tab.Screen
        name={AppRoutes.HOME_TAB}
        component={Home}
        options={{
          tabBarStyle: stylesWithInset,
          headerShown: false,
          tabBarLabel: renderLabel('Início'),
          tabBarIcon: renderIcon('house'),
        }}
      />
      <Tab.Screen
        name={AppRoutes.MENU_TAB}
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

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    tabBarStyle: {
      shadowColor: theme.colors.black,
      backgroundColor: theme.colors.surface,
      shadowOpacity: 0.05,
      shadowRadius: 5,
      borderTopColor: applyOpacity(theme.colors.border, 0.5),
      elevation: 5,
    },

    fallbackLoading: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
  });

export default TabNavigator;
