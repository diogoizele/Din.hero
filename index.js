import { AppRegistry } from 'react-native';
import App from './src/app/App';
import StorybookUI from './.rnstorybook';
import { name as appName } from './app.json';

const isDev = __DEV__;

AppRegistry.registerComponent(appName, () =>
  isDev && process.env.STORYBOOK_ENABLED === 'true' ? StorybookUI : App,
);
