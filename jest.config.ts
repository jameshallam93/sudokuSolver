/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  compilerOptions: {
    outFile: "../../built/local/tsc.js",
  }
};