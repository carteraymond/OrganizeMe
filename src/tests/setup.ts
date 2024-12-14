import '@testing-library/jest-dom';

declare global {
    var mockServiceResponse: (data: any) => Promise<any>;
    var mockServiceError: (error: Error) => Promise<never>;
}

// Increase timeout for all tests
jest.setTimeout(10000);

// Suppress console.error and console.warn during tests
global.console.error = jest.fn();
global.console.warn = jest.fn();

// Clear all mocks automatically between tests
beforeEach(() => {
jest.clearAllMocks();
});

// Add global test utilities if needed
global.mockServiceResponse = (data: any) => {
return Promise.resolve(data);
};

global.mockServiceError = (error: Error) => {
return Promise.reject(error);
};
