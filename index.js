import { AppRegistry } from 'react-native';
import App from './src/app/App';
import StorybookUI from './.rnstorybook';
import { name as appName } from './app.json';

const isDev = __DEV__;

const STORYBOOK_ENABLED = false;

AppRegistry.registerComponent(appName, () =>
  isDev && STORYBOOK_ENABLED ? StorybookUI : App,
);
