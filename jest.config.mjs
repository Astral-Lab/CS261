export default {
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    transform: { '^.+\\.[t|j]sx?$': 'babel-jest' },
}