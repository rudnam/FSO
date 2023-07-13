module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
    'cypress/globals': true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react', 'jest', 'cypress',
  ],
  rules: {
    'no-shadow': 'off',
    'no-console': 'off',
    'no-alert': 'off',
    'import/no-extraneous-dependencies': 'off',
    'func-names': 'off',
  },
};
