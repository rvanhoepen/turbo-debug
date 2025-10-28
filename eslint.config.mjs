import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  eslintPluginPrettierRecommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        // Node globals
        console: 'readonly',
        process: 'readonly',
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',

        // Browser globals
        window: 'readonly',
        document: 'readonly',
        Event: 'readonly',

        // Jest globals
        describe: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        jest: 'readonly',
      },
    },
    rules: {
      'no-console': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'prettier/prettier': ['error'],
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
    },
  },
];
