const { presets } = require('@guilhermetod/lintr');

module.exports = {
  linters: [
    presets.cspell({ pattern: '!**/*.json' }),
    presets.eslint({ pattern: '**/*.(js|ts)' }),
    presets.typescript({ build: true }),
  ],
  errorOnEmptyTarget: false,
};
