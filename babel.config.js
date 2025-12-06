module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@app': './src/app',
          '@shared': './src/shared',
          '@data': './src/data',
          '@features': './src/features',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
