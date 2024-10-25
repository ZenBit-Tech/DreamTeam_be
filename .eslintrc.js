const { rules } = require('eslint-plugin-prettier');

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['*.entity.ts'],
      rules: {
        'import/no-cycle': 'off',
      },
    },
    {
      files: ['*.spec.ts'],
      rules: {
        'typesafe/no-await-without-trycatch': 'off',
      },
    },
  ],
  plugins: [
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint',
    'import',
    'typesafe',
    'prettier',
  ],
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },

  ignorePatterns: ['.eslintrc.js', '**/node_modules/**', 'dist/**'],
  rules: {
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
      { blankLine: 'always', prev: 'directive', next: '*' },
      { blankLine: 'any', prev: 'directive', next: 'directive' },
      { blankLine: 'always', prev: ['case', 'default'], next: '*' },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        pathGroups: [
          {
            pattern: '@nestjs/**',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'typesafe/no-throw-sync-func': 'error',
    'typesafe/no-await-without-trycatch': 'warn',
    'typesafe/promise-catch': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    'import/prefer-default-export': 'off',
  },
};
