process.env.TZ = 'UTC';

module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
  },

  // Reanimated precisa ser transformado pelo Babel mesmo dentro de node_modules.
  // O preset react-native já exclui node_modules; abrimos exceção só para as libs necessárias.
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-reanimated|react-native-safe-area-context|@react-navigation)/)',
  ],

  // Carrega o mock global da lib antes de qualquer teste.
  setupFiles: [
    'react-native-reanimated/mock',
    'react-native-gesture-handler/jestSetup',
  ],
};
