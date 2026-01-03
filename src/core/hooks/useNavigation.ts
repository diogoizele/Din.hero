import { useNavigation } from '@react-navigation/native';
import { AppStackNavigationProps } from '../navigation/PrivateStackNavigator.types';
import { useCallback } from 'react';

export const useAppNavigation = () => {
  const navigation = useNavigation<AppStackNavigationProps>();

  const hideTabBar = useCallback(() => {
    navigation.setOptions({ tabBarStyle: { display: 'none' } });
  }, []);

  const showTabBar = useCallback(() => {
    navigation.setOptions({ tabBarStyle: undefined });
  }, []);

  return {
    hideTabBar,
    showTabBar,
  };
};
