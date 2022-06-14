module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/test_utils/setup.ts"],
  // globals: {
  //   "ts-jest": {
  //     // ts-jest configuration goes here
  //     tsconfig: "<rootDir>/tsconfig.json",
  //   },
  // },
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!build/**",
  ],
  moduleNameMapper: {
    "\\.(scss|css)$": "<rootDir>/src/__mocks__/styleMock.ts",
    "src/(.*)": "<rootDir>/src/$1",
    "test_utils/(.*)": "<rootDir>/test_utils/$1",
  },
};
