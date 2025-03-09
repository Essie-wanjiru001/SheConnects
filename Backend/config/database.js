require('dotenv').config();
const mysql = require('mysql2');

const config = {
  development: {
    host: 'localhost',
    user: 'essie',
    password: 'Alvin2025**',
    database: 'sheconnects',
    port: 3306
  },
  production: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
      rejectUnauthorized: false
    }
  }
};

const env = process.env.NODE_ENV || 'development';
const pool = mysql.createPool(config[env]).promise();

module.exports = pool;
