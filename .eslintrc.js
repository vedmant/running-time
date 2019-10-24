// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2017,
  },
  env: {
    browser: true,
  },
  extends: [
    'plugin:vue/recommended',
  ],
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

    'comma-dangle': 0,

    'no-multiple-empty-lines': 0,

    'space-unary-ops': [2, {
      'words': true,
      'nonwords': true,
      'overrides': {
        '++': false,
        '--': false,
      },
    }],

    'vue/singleline-html-element-content-newline': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/max-attributes-per-line': ['error', {
      'singleline': 6,
      'multiline': {
        'max': 1,
        'allowFirstLine': false,
      },
    }],
  },

  globals: {
    '$': false,
    'jQuery': false,
    'Together': false,
    'bootbox': false,
    'Stripe': false,
    'Laravel': false,
  },
}
