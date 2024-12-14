import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
preset: 'ts-jest',
testEnvironment: 'node',
moduleFileExtensions: ['ts', 'js', 'json'],
testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
},
moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
},
coverageDirectory: 'coverage',
collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/**/*.d.ts',
    '!src/api-docs/**',
    '!src/types/**',
],
coverageThreshold: {
    global: {
    branches: 80,
    functions: 80,
    lines: 80,
    statements: 80,
    },
},
verbose: true,
setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
};

export default config;
