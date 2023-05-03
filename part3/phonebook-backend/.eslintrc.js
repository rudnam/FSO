module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
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
    indent: [
      'error',
      2,
    ],
    'no-shadow': 0,
    'no-unused-vars': 0,
    'no-console': 0,
    'consistent-return': 0,
    'import/no-extraneous-dependencies': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
  },
};
