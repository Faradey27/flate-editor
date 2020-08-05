module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setupTests.ts'],
  transform: {
    '\\.(ts|tsx)?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  testMatch: ['<rootDir>/src/**/?(*.)test.{ts,tsx}'], // looks for your test
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/public/',
    '/.next/',
    '/.history/',
  ],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.history/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!**/pages/**',
    '!.eslintrc.js',
    '!jest.config.js',
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  moduleDirectories: [
    '.',
    'src',
    'src/util',
    'src/components',
    'src/screens',
    'node_modules',
  ],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  coverageReporters: ['text', 'lcov'],
};
