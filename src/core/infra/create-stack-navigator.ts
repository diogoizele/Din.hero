import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator as libCreateStackNavigator } from '@react-navigation/stack';

// const apiLevel = Platform.Version as number;

const useJSStack = Platform.OS === 'android';
// && apiLevel < 35;

export const createStackNavigator = useJSStack
  ? libCreateStackNavigator
  : createNativeStackNavigator;
