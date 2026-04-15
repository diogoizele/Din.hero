module.exports = {
  root: true,
  ignorePatterns: ['coverage/*', '**.stories.*'],
  extends: ['@react-native'],
  plugins: ['react-compiler', 'jest'],
  rules: {
    'react-compiler/react-compiler': 'error',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'react-hooks/exhaustive-deps': 'off',
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['src/features/*/*'],
            message:
              'Do not deep import from other features. Import from the feature public API (index.ts) instead.',
          },
        ],
      },
    ],
  },
};
