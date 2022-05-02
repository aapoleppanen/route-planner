module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    quotes: ['error', 'single'],
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    'comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/indent': 'off',
    indent: ['error', 2, { SwitchCase: 1 }],
    'import/no-cycle': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'operator-linebreak': ['warn', 'after'],
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsForRegex: ['^state'] },
    ],
  },
  ignorePatterns: [
    '.eslintrc.js',
    'graphql.tsx',
    'serviceWorker.ts',
    'cypress',
  ],
};
