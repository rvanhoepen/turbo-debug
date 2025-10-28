export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    '^.+\\.css$': '<rootDir>/test/__mocks__/styleMock.js',
  },
  transform: {
    '^.+\\.js$': ['babel-jest', { configFile: './babel.config.mjs' }],
  },
};
