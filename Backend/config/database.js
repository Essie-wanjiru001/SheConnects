const mysql = require('mysql2');
require('dotenv').config();

const isProd = process.env.NODE_ENV === 'production';
const config = {
  host: isProd ? '130.211.127.163' : 'localhost',
  user: isProd ? 'root' : 'essie',
  password: process.env.DB_PASSWORD,
  database: 'sheconnects',
  port: parseInt(process.env.DB_PORT) || 3306,
  ssl: isProd ? {
    rejectUnauthorized: false
  } : false,
  connectTimeout: 60000,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(config).promise();

// Add connection monitoring
pool.on('connection', (connection) => {
  console.log('✅ New database connection established');
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
});

pool.on('error', (err) => {
  console.error('Database error:', err.message);
});

const testConnection = async () => {
  try {
    const [result] = await pool.query('SELECT NOW() as time');
    console.log('✅ Database connected:', result[0].time);
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', {
      error: error.message,
      code: error.code,
      host: config.host,
      database: config.database
    });
    throw error;
  }
};

// Graceful shutdown handler
process.on('SIGINT', async () => {
  try {
    await pool.end();
    console.log('👋 Database pool closed gracefully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error closing pool:', err.message);
    process.exit(1);
  }
});

module.exports = { pool, testConnection, config };