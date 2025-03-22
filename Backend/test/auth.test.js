const request = require('supertest');
const app = require('../server');
const bcrypt = require('bcryptjs');
const { pool } = require('../config/database');

describe('Authentication Tests', () => {
  let testUserId;

  beforeAll(async () => {
    const hashedPassword = await bcrypt.hash('TestPass123!', 10);
    const [result] = await pool.query(`
      INSERT INTO users (name, email, password, is_admin) VALUES 
      ('Test User', 'test@example.com', ?, 0),
      ('Admin User', 'admin@example.com', ?, 1)
    `, [hashedPassword, hashedPassword]);
    
    testUserId = result.insertId;
  });

  afterAll(async () => {
    if (testUserId) {
      await pool.query('DELETE FROM users WHERE userID = ?', [testUserId]);
    }
    await pool.query('DELETE FROM users WHERE email IN (?, ?)', 
      ['test@example.com', 'admin@example.com']);
  });

  describe('User Registration', () => {
    test('should register a new user successfully', async () => {
      const newUser = {
        name: 'New User',
        email: 'newuser@example.com',
        password: 'NewPass123!'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(newUser)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message', 'Registration successful');
      expect(response.body).toHaveProperty('userId');
    });

    test('should fail with invalid email format', async () => {
      const invalidUser = {
        name: 'Invalid User',
        email: 'test.com',
        password: 'Pass123!'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(invalidUser)
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message', 'Invalid email format');
    });

    test('should fail with duplicate email', async () => {
      const duplicateUser = {
        name: 'Duplicate User',
        email: 'test@example.com',
        password: 'Pass123!'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(duplicateUser)
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message', 'Email is already registered');
    });
  });

  describe('User Login', () => {
    test('should login successfully with correct credentials', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'TestPass123!'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(credentials)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('email', 'test@example.com');
    });

    test('should fail with incorrect password', async () => {
      const invalidCredentials = {
        email: 'test@example.com',
        password: 'WrongPass123!'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(invalidCredentials)
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message', 'Invalid credentials');
    });

    test('should fail with non-existent email', async () => {
      const nonExistentUser = {
        email: 'nonexistent@example.com',
        password: 'Pass123!'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(nonExistentUser)
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message', 'Invalid credentials');
    });
  });
});