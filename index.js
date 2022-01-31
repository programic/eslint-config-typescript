module.exports = {
  parser: '@typescript-eslint/parser',

  plugins: ['@typescript-eslint'],

  overrides: [
    {
      files: ['*.js'],
      parser: 'espree',
      extends: ['@programic/eslint-config-base'],
    },
    // eslint-disable-next-line global-require
    require('./typescript-override'),
  ],
};
