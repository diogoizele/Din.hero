/** @type {import('react-native-worklets/plugin').PluginOptions} */
const workletsPluginOptions = {
  // Your custom options.
};

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@core': './src/core',
          '@data': './src/data',
          '@features': './src/features',
        },
      },
    ],
    ['react-native-worklets/plugin', workletsPluginOptions],
  ],
};
