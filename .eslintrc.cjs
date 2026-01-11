module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // relax prop-types enforcement (this project uses other typing strategies)
    'react/prop-types': 'off',
    // allow unescaped entities in JSX (apostrophes in text)
    'react/no-unescaped-entities': 'off',
  },
  overrides: [
    {
      files: ['**/__mocks__/**'],
      env: { node: true, commonjs: true },
      rules: {
        'no-undef': 'off'
      }
    },
    {
      files: ['**/*.test.{js,jsx,ts,tsx}', 'src/**/__tests__/**'],
      env: { jest: true },
      rules: {
        'no-undef': 'off'
      }
    },
    {
      files: ['cypress/**/*.js', 'cypress/**/*.cy.{js,jsx,ts,tsx}'],
      env: { browser: true, mocha: true },
      globals: {
        cy: 'readonly',
        Cypress: 'readonly'
      },
      rules: {
        'no-undef': 'off'
      }
    }
  ]
}