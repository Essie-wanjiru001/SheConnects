require('dotenv').config();
const mysql = require('mysql2');

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT) || 3306,
  connectTimeout: 60000,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false
  }
};

// Only log non-sensitive configuration details
console.log('📊 Database configuration:', {
  host: config.host,
  user: config.user,
  database: config.database,
  port: config.port
});

const pool = mysql.createPool(config);
pool.on('connection', (connection) => {
  console.log('✅ New database connection established');
});

pool.on('error', (err) => {
  console.error('Database connection error:', err);
  if (err.code === 'ECONNREFUSED') {
    console.error('🚫 Connection refused. Check authorized networks.');
  }
});

const promisePool = pool.promise();

async function testConnection() {
  try {
    const connection = await promisePool.getConnection();
    await connection.ping();
    console.log('✅ Database connection test successful');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection test failed:', error.message);
    throw error; // Propagate the error for better error handling
  }
}

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

module.exports = {
  promisePool,
  testConnection,
  config: {
    host: config.host,
    database: config.database,
    port: config.port
  }
};