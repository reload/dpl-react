import type { Config } from "@jest/types";
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.(j|t)s?$": "babel-jest"
  },
  transformIgnorePatterns: ["node_modules/(?!(p-retry)/)"],
  testMatch: ["**/tests/**/*.test.tsx"]
};
export default config;
