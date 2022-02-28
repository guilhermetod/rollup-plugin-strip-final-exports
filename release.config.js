const { commitConvention } = require('./tools/utils/commit-convention');

const releaseRules = commitConvention.map(({ type, release }) => ({ type, release }));
const types = commitConvention.map(({ type, section }) => ({
  type: type.toLowerCase(),
  section,
  hidden: false,
}));

module.exports = {
  branches: ['main'],
  plugins: [
    ['@semantic-release/commit-analyzer', { preset: 'conventionalcommits', releaseRules }],
    ['@semantic-release/release-notes-generator', { preset: 'conventionalcommits', presetConfig: { types } }],
    ['@semantic-release/npm'],
    ['@semantic-release/git', { message: 'chore(release): <%=nextRelease.version%> \n\n <%=nextRelease.notes%>' }],
    ['@semantic-release/github'],
  ],
};
