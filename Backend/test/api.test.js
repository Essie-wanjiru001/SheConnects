const request = require('supertest');
const app = require('../server');
const { setupTestDb, teardownTestDb } = require('./testConfig');

describe('API Integration Tests', () => {
  beforeAll(async () => {
    await setupTestDb();
  });

  afterAll(async () => {
    await teardownTestDb();
  });

  describe('Internships API', () => {
    test('GET /api/internships should return all active internships', async () => {
      const response = await request(app)
        .get('/api/internships')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(Array.isArray(response.body.internships)).toBe(true);
      expect(response.body.internships[0]).toHaveProperty('title');
      expect(response.body.internships[0]).toHaveProperty('company');
    });

    test('GET /api/internships/search should filter internships', async () => {
      const response = await request(app)
        .get('/api/internships/search')
        .query({ type: 'Full-time' })
        .expect(200);

      expect(Array.isArray(response.body.internships)).toBe(true);
    });
  });

  describe('Scholarships API', () => {
    test('GET /api/scholarships should return all active scholarships', async () => {
      const response = await request(app)
        .get('/api/scholarships')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(Array.isArray(response.body.scholarships)).toBe(true);
      expect(response.body.scholarships[0]).toHaveProperty('name');
      expect(response.body.scholarships[0]).toHaveProperty('description');
    });
  });

  describe('Events API', () => {
    test('GET /api/events should return all upcoming events', async () => {
      const response = await request(app)
        .get('/api/events')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(Array.isArray(response.body.events)).toBe(true);
      expect(response.body.events[0]).toHaveProperty('title');
      expect(response.body.events[0]).toHaveProperty('event_date');
    });
  });
});