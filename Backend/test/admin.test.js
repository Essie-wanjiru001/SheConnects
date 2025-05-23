const request = require('supertest');
const app = require('../server');
const bcrypt = require('bcryptjs');
const { pool } = require('../config/database');
const { cleanupDatabase } = require('./utils/db');

describe('Admin Features Tests', () => {
  let adminToken;
  let testUserId;

  beforeAll(async () => {
    try {
      // Clean up before tests
      await cleanupDatabase();

      // Create admin user
      const hashedPassword = await bcrypt.hash('TestPass123!', 10);
      const [adminResult] = await pool.execute(
        'INSERT INTO users (name, email, password, is_admin) VALUES (?, ?, ?, ?)',
        ['Admin User', 'admin@example.com', hashedPassword, 1]
      );

      // Create test user
      const [userResult] = await pool.execute(
        'INSERT INTO users (name, email, password, is_admin) VALUES (?, ?, ?, ?)',
        ['Test User', 'test@example.com', hashedPassword, 0]
      );
      
      testUserId = userResult.insertId;

      // Login to get admin token
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'admin@example.com',
          password: 'TestPass123!'
        });

      adminToken = response.body.token;
    } catch (error) {
      console.error('Test setup error:', error);
      throw error;
    }
  });

  afterAll(async () => {
    await cleanupDatabase();
  });

  describe('Admin Authentication', () => {
    test('should login as admin successfully', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'admin@example.com',
          password: 'TestPass123!'
        })
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toHaveProperty('email', 'admin@example.com');
      // Updated to check for id instead of is_admin since that's what the API returns
      expect(response.body.user).toHaveProperty('id');
    });
  });

  describe('User Management', () => {
    test('should get all users', async () => {
      const response = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(Array.isArray(response.body.users)).toBe(true);
      expect(response.body.users[0]).toHaveProperty('email');
    });

    test('should delete user account', async () => {
      const response = await request(app)
        .delete(`/api/admin/users/${testUserId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message', 'User deleted successfully');
    });

    test('should not delete admin account', async () => {
      const [adminUser] = await pool.query(
        'SELECT userID FROM users WHERE email = ?', 
        ['admin@example.com']
      );

      const response = await request(app)
        .delete(`/api/admin/users/${adminUser[0].userID}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(403);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message', 'Cannot delete admin users');
    });
  });

  describe('Content Management', () => {
    test('should create new internship', async () => {
      const internship = {
        title: 'Test Internship',
        company: 'Test Company',
        description: 'Test Description',
        location: 'Remote',
        deadline: '2025-12-31',
        type: 'Full-time',
        apply_link: 'https://example.com/apply'
      };

      const response = await request(app)
        .post('/api/admin/internships')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(internship)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('id');
    });

    test('should create new scholarship', async () => {
      const scholarship = {
        name: 'Test Scholarship',
        description: 'Test Description',
        eligibility: 'Test Eligibility',
        application_deadline: '2025-12-31',
        apply_link: 'https://example.com/apply' 
      };

      const response = await request(app)
        .post('/api/admin/scholarships')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(scholarship)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('id');
    });
  });

  describe('Analytics', () => {
    test('should get platform statistics', async () => {
      const response = await request(app)
        .get('/api/admin/stats')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.stats).toHaveProperty('totalUsers');
      expect(response.body.stats).toHaveProperty('activeScholarships');
      expect(response.body.stats).toHaveProperty('activeInternships');
      expect(response.body.stats).toHaveProperty('upcomingEvents');
    });
  });
});