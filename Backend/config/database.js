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

const pool = mysql.createPool({
  ...config,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
}).promise();

let server; // Add this at the top level

// Improved connection monitoring
pool.on('connection', (connection) => {
  console.log('New database connection established:', {
    threadId: connection.threadId,
    host: config.host,
    database: config.database
  });
  
  connection.on('error', (err) => {
    console.error('Database connection error:', {
      code: err.code,
      fatal: err.fatal
    });
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('Attempting to reconnect...');
    }
  });
});

pool.on('error', (err) => {
  console.error('Database error:', err);
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

// Enhanced graceful shutdown
const shutdown = async (signal) => {
  try {
    console.log(`\n${signal} received. Shutting down gracefully...`);
    
    // Close database connections first
    console.log('Closing database connections...');
    await pool.end();
    console.log('✅ Database connections closed');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error during shutdown:', err);
    process.exit(1);
  }
};

// Export setServer function to be called from main application file
const setServer = (httpServer) => {
  server = httpServer;
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

module.exports = { pool, testConnection, config, setServer };