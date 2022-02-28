const { commitConvention } = require('./tools/utils/commit-convention');

const types = commitConvention.map((rule) => rule.type);

module.exports = {
  extends: '@commitlint/config-conventional',
  rules: {
    'type-case': [2, 'always', 'sentence-case'],
    'type-enum': [2, 'always', types],
  },
};
