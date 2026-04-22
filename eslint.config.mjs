export default [
  {
    ignores: [
      '_site/**',
      'node_modules/**',
      'vendor/**',
      'krpano/**',
      'modules/xiaowanle/games/mikutap/js/*.min.js',
      'modules/xiaowanle/games/mikutap/js/*.map',
      'js/highlight.pack.js',
    ],
  },
  {
    files: ['js/**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'script',
      globals: {
        $: 'readonly',
        document: 'readonly',
        location: 'readonly',
        MutationObserver: 'readonly',
        setInterval: 'readonly',
        setTimeout: 'readonly',
        clearInterval: 'readonly',
        clearTimeout: 'readonly',
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
