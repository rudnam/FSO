module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
