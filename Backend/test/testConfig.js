require('dotenv').config({ path: '.env.test' });
const mysql = require('mysql2/promise');

const testConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'essie',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME_TEST || 'sheconnects_test'
};

const setupTestDb = async () => {
  let connection;
  try {
    // Create initial connection without database
    connection = await mysql.createConnection({
      host: testConfig.host,
      user: testConfig.user,
      password: testConfig.password
    });

    // Create and use test database
    await connection.query(`DROP DATABASE IF EXISTS ${testConfig.database}`);
    await connection.query(`CREATE DATABASE ${testConfig.database}`);
    await connection.query(`USE ${testConfig.database}`);

    // Create tables with full schema
    await connection.query(`
      CREATE TABLE internships (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        description TEXT,
        location VARCHAR(100),
        deadline DATE,
        type VARCHAR(50),
        duration VARCHAR(50),
        isPaid TINYINT(1) DEFAULT 0,
        apply_link VARCHAR(255),
        is_active TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE scholarships (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        eligibility TEXT,
        application_deadline DATE,
        apply_link VARCHAR(255),
        is_active TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE events (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        event_date DATE NOT NULL,
        start_time TIME,
        end_time TIME,
        location VARCHAR(255),
        event_type VARCHAR(50),
        isVirtual TINYINT(1) DEFAULT 0,
        isFree TINYINT(1) DEFAULT 1,
        registration_link VARCHAR(255),
        is_active TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Insert test data
    const testData = [
      {
        table: 'internships',
        data: {
          title: 'Test Internship',
          company: 'Test Company',
          description: 'Test Description',
          location: 'Test Location',
          deadline: '2023-12-31',
          type: 'Full-time',
          duration: '6 months',
          isPaid: 1,
          apply_link: 'http://testapplylink.com',
          is_active: 1
        }
      },
      {
        table: 'scholarships',
        data: {
          name: 'Test Scholarship',
          description: 'Test Description',
          eligibility: 'Test Eligibility',
          application_deadline: '2023-12-31',
          apply_link: 'http://testapplylink.com',
          is_active: 1
        }
      },
      {
        table: 'events',
        data: {
          title: 'Test Event',
          description: 'Test Description',
          event_date: '2023-12-31',
          start_time: '10:00:00',
          end_time: '12:00:00',
          location: 'Test Location',
          event_type: 'Webinar',
          isVirtual: 1,
          isFree: 1,
          registration_link: 'http://testregistrationlink.com',
          is_active: 1
        }
      }
    ];

    for (const { table, data } of testData) {
      const columns = Object.keys(data).join(', ');
      const values = Object.values(data).map(value => `'${value}'`).join(', ');
      await connection.query(`INSERT INTO ${table} (${columns}) VALUES (${values})`);
    }

    await connection.end();
  } catch (error) {
    console.error('Test DB Setup Error:', error);
    throw error;
  }
};

const teardownTestDb = async () => {
  try {
    const connection = await mysql.createConnection(testConfig);
    await connection.query(`DROP DATABASE IF EXISTS ${testConfig.database}`);
    await connection.end();
  } catch (error) {
    console.error('Test DB Teardown Error:', error);
    throw error;
  }
};

module.exports = { testConfig, setupTestDb, teardownTestDb };