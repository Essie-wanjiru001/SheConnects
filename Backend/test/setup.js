beforeAll(() => {
  // Add any global setup here
  console.log('Starting tests...');
});

afterAll(() => {
  // Cleanup after all tests
  console.log('Finished tests...');
});

// Add custom matchers
expect.extend({
  toBeFalse(received) {
    return {
      message: () => `expected ${received} to be false`,
      pass: received === false
    };
  }
});