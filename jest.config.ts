import { Config } from "jest";
import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

const config: Config = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  verbose: true,
  testPathIgnorePatterns: [
    "/node_modules/",
  ],
  roots: ["<rootDir>/test"],
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
};

export default config;
