const { pathsToModuleNameMapper } = require('ts-jest');

const { compilerOptions } = require('./tsconfig.base.json');

module.exports = {
  coverageDirectory: '<rootDir>/tests/reports/coverage',
  coveragePathIgnorePatterns: [
    'index\\.ts$',
    '\\.d\\.ts$',
  ],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.test.json',
    },
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  preset: 'ts-jest',
  restoreMocks: true,
  testEnvironment: 'node',
};
