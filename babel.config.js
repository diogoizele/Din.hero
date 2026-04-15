const ReactCompilerConfig = {
  target: '19',
};

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@app': './src/app',
          '@core': './src/core',
          '@features': './src/features',
          '@shared': './src/shared',
        },
      },
    ],
    ['babel-plugin-react-compiler', ReactCompilerConfig],
    'react-native-reanimated/plugin',
  ],
};
