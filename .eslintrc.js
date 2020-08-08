module.exports = {
  extends: ['airbnb', 'prettier', 'prettier/react'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
    'react-hooks',
    'class-prefer-methods',
    'simple-import-sort',
  ],
  overrides: [
    {
      files: [
        '**/*.test.ts',
        '**/*.test.tsx',
        '__tests__/**',
        'e2e/**',
        '**/*.driver.tsx',
      ],
      rules: { 'import/no-extraneous-dependencies': 'off' },
      env: { jest: true },
    },
  ],
  globals: {
    fetch: true,
    fetchMock: true,
    jasmine: true,
    document: true,
  },
  rules: {
    'prettier/prettier': ['error'],
    'react/forbid-prop-types': ['error'],
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.tsx'] }],
    'react/static-property-placement': ['error', 'static public field'],
    'react/jsx-no-bind': ['error', {}],
    'class-prefer-methods/prefer-methods': 'error',
    'simple-import-sort/sort': [
      'error',
      {
        groups: [
          [
            '^react', // Ensure that import from 'react' is at the top
            '^next',
            '^(?!(api|components|hooks|screens|services|styles|types|[.]+)(/|$))',
          ],
          // Everything else
          ['^(api|hooks|services|types|utils)(/|$)'],
          // UI modules
          ['^(screens|components|styles)(/|$)'],
          // Relative imports
          ['^[.]'],
        ],
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/jsx-fragments': ['error', 'element'],
    'no-plusplus': ['off'],
    'import/prefer-default-export': ['off'],
    'react/jsx-props-no-spreading': ['off'],
    'react/react-in-jsx-scope': ['off'], // nextjs provide global react
    'no-unused-vars': ['off'], // works badly with typescript
    'import/extensions': ['off'], // works badly with typescript
    'react/prop-types': ['off'],
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
      typescript: {},
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    react: {
      version: 'detect',
    },
  },
};
