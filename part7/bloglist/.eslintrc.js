module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
    "cypress/globals": true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "jest", "cypress"],
  rules: {
    "no-shadow": "off",
    "no-console": "off",
    "no-alert": "off",
    "import/no-extraneous-dependencies": "off",
    "func-names": "off",
    "no-unused-vars": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/function-component-definition": "off",
    "react/button-has-type": "off",
    "react/prop-types": "off",
    "react/destructuring-assignment": "off",
  },
};