module.exports = {
  root: true,
  extends: ['@react-native'],
  plugins: ['jest'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn'],
    'react-hooks/exhaustive-deps': 'off',
  },
};
