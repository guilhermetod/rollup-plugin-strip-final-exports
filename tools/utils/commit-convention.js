const commitConvention = [
  { type: 'Build', release: 'patch', section: 'Internal changes' },
  { type: 'Chore', release: false, section: 'Other changes' },
  { type: 'CI', release: false, section: 'Other changes' },
  { type: 'Docs', release: false, section: 'Other changes' },
  { type: 'Feat', release: 'minor', section: 'Features' },
  { type: 'Fix', release: 'patch', section: 'Bug fixes' },
  { type: 'Perf', release: 'patch', section: 'Internal changes' },
  { type: 'Refactor', release: 'patch', section: 'Internal changes' },
  { type: 'Revert', release: 'patch', section: 'Revert' },
  { type: 'Style', release: false, section: 'Other changes' },
  { type: 'Test', release: false, section: 'Other changes' },
];

module.exports = { commitConvention };
