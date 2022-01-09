module.exports = {
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!build/**",
  ],
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/src/$1",
    "test_utils/(.*)": "<rootDir>/test_utils/$1",
  },
};
