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
    'react-native-reanimated/plugin',
  ],
};
