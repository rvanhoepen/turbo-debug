export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
  transform: {
    '^.+\\.js$': ['babel-jest', { configFile: './babel.config.mjs' }],
  },
};
