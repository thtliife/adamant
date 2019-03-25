module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['plugin:jest/recommended', 'jest-enzyme'],
  plugins: ['babel', 'import', 'jsx-a11y', 'react', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'react/require-default-props': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],

    'react/no-find-dom-node': 'off',
    'react/no-did-mount-set-state': 'off',
    'react/no-unused-prop-types': 'off',
    'react/jsx-one-expression-per-line': 'off',

    'jsx-a11y/anchor-is-valid': [
      'error',
      { components: ['Link'], specialLink: ['to'] }
    ],
    'jsx-a11y/label-has-for': [
      2,
      {
        required: {
          every: ['id']
        }
      }
    ],

    'prettier/prettier': ['error']
  }
};
