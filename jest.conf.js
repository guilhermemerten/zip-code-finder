const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, './'),
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  globalSetup: './tests/env/dotenv-test.js',
  coverageDirectory: './coverage/reports',
  coverageReporters: ['text', 'clover', 'lcov'],
  collectCoverageFrom: [
    '**/src/**/*.ts',
    '!**/spec/**/*.ts',
    '!**/tests/**/*.ts',
  ]
};