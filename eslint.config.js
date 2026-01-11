import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: process.cwd(),
  recommended: true,
});

export default [
  // Extends from your old config
  ...compat.extends("eslint:recommended"),
  ...compat.extends("plugin:react/recommended"),
  ...compat.extends("plugin:react/jsx-runtime"),
  ...compat.extends("plugin:react-hooks/recommended"),

  // Global rules
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    env: {
      browser: true,
      es2020: true,
    },
    plugins: {
      "react-refresh": require("eslint-plugin-react-refresh"),
    },
    settings: {
      react: { version: "18.2" },
    },
    rules: {
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "react/prop-types": "off",
      "react/no-unescaped-entities": "off",
    },
  },

  // Mocks override
  {
    files: ["**/__mocks__/**"],
    env: { node: true, commonjs: true },
    rules: {
      "no-undef": "off",
    },
  },

  // Jest override
  {
    files: ["**/*.test.{js,jsx,ts,tsx}", "src/**/__tests__/**"],
    env: { jest: true },
    rules: {
      "no-undef": "off",
    },
  },

  // Cypress override
  {
    files: ["cypress/**/*.js", "cypress/**/*.cy.{js,jsx,ts,tsx}"],
    env: { browser: true, mocha: true },
    globals: {
      cy: "readonly",
      Cypress: "readonly",
    },
    rules: {
      "no-undef": "off",
    },
  },
];
