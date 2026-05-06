const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

const config = {
  transformer: {
    babelTransformerPath: require.resolve(
      'react-native-svg-transformer/react-native',
    ),
    unstable_allowRequireContext: true,
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
};

const baseConfig = mergeConfig(defaultConfig, config);

let finalConfig = baseConfig;

if (process.env.STORYBOOK_ENABLED === 'true') {
  const {
    withStorybook,
  } = require('@storybook/react-native/metro/withStorybook');

  finalConfig = withStorybook(baseConfig, {
    enabled: true,
  });
}

module.exports = wrapWithReanimatedMetroConfig(finalConfig);
