const { closeConnection } = require('./utils/db');

beforeAll(() => {
  // Add any global setup here
  console.log('Starting tests...');
});

afterAll(async () => {
  // Cleanup after all tests
  console.log('Finishing tests...');
  await closeConnection();
});

jest.setTimeout(30000); // Increase timeout to 30 seconds

// Add custom matchers
expect.extend({
  toBeFalse(received) {
    return {
      message: () => `expected ${received} to be false`,
      pass: received === false
    };
  }
});