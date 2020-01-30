module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ["build"],
  collectCoverageFrom: [
    "**/src/functions/*.ts"
  ]
};
