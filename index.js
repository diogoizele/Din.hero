import { AppRegistry } from 'react-native';
import App from './src/app/App';
import StorybookUI from './.rnstorybook';
import { name as appName } from './app.json';

const SHOW_STORYBOOK = process.env.STORYBOOK_ENABLED ?? false;

AppRegistry.registerComponent(appName, () =>
  SHOW_STORYBOOK ? StorybookUI : App,
);
