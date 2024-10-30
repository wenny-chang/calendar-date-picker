export default {
  preset: "ts-jest",
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
    "^.+\\.svg": "<rootDir>/tests/mocks/svgMock.tsx",
  },
  // to obtain access to the matchers.
  setupFilesAfterEnv: ["<rootDir>/setupTesting.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  modulePaths: ["<rootDir>"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.test.json",
      },
    ],
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};
