export default [
  {
    ignores: [
      '_site/**',
      'node_modules/**',
      'vendor/**',
      'krpano/**',
      'modules/xiaowanle/games/mikutap/js/*.min.js',
      'modules/xiaowanle/games/mikutap/js/*.map',
    ],
  },
  {
    files: ['js/**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        document: 'readonly',
        MutationObserver: 'readonly',
        window: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-var': 'off',
      'prefer-const': 'warn',
    },
  },
];
