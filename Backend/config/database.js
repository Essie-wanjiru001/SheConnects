require('dotenv').config();
const mysql = require('mysql2');

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectTimeout: 60000,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false
  }
};

const pool = mysql.createPool(config);
const promisePool = pool.promise();

// Test connection function
async function testConnection() {
  try {
    const [result] = await promisePool.query('SELECT 1');
    console.log('✅ Database connected successfully');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
}

module.exports = {
  pool: promisePool,
  testConnection
};
