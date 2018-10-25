module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    es6: true,
    browser: true,
  },
  extends: ['airbnb-base', 'eslint-config-standard-react'],
  // add your custom rules here
  'rules': {
    "import/prefer-default-export": 0,
    "camelcase": 0,
    'no-param-reassign': 0,
    'import/first': 0,
    'import/named': 2,
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    'no-debugger': 2
  }
};
