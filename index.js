module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },

  parser: '@typescript-eslint/parser',

  settings: {
    'import/resolver': {
      typescript: {},
    },
  },

  plugins: ['@typescript-eslint'],

  extends: [
    '@programic/eslint-config-base',
    'plugin:@typescript-eslint/recommended',
  ],

  overrides: [{
    files: ['*.js'],
    parser: 'espree',
    extends: ['@programic/eslint-config-base'],
  }],

  rules: {
    // Cannot annotate types within deconstructing, so it's necessary
    // to declare variables without object/array destructing
    'prefer-destructuring': 'off',
    // Don't add file extensions in imports for the following file types
    'import/extensions': ['error', 'ignorePackages', {
      // Default of airbnb
      js: 'never',
      mjs: 'never',
      jsx: 'never',
      // Also TypeScript files
      ts: 'never',
      tsx: 'never',
    }],
  },
};
