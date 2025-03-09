require('dotenv').config();
const mysql = require('mysql2');

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  connectTimeout: 60000,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false
};

console.log('📊 Database configuration:', {
  host: config.host,
  user: config.user,
  database: config.database,
  port: config.port
});

const pool = mysql.createPool(config);
const promisePool = pool.promise();

module.exports = promisePool;
