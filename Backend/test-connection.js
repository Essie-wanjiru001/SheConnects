require('dotenv').config({ path: '.env.production' });
const mysql = require('mysql2');

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectTimeout: 30000,
  ssl: {
    rejectUnauthorized: false
  }
  // Remove socketPath for direct TCP connection
};

console.log('🔄 Testing database connection...');
console.log('📝 Connection config:', {
  host: config.host,
  user: config.user,
  database: config.database,
  port: config.port
});

const pool = mysql.createPool(config).promise();

async function testConnection() {
  try {
    const [result] = await pool.execute('SELECT 1 as connection_test');
    if (result[0].connection_test === 1) {
      console.log('✅ Database connection test successful');
      
      // Test table access
      const [tables] = await pool.execute('SHOW TABLES');
      console.log('📋 Available tables:', tables.map(t => Object.values(t)[0]));
      
      return true;
    }
  } catch (err) {
    console.error('❌ Database connection test failed:', {
      message: err.message,
      code: err.code,
      state: err.sqlState
    });
    
    // Additional diagnostics
    if (err.code === 'ECONNREFUSED') {
      console.log('\n🔍 Connection refused. Please check:');
      console.log('1. Database server is running');
      console.log('2. Correct host and port:', config.host, config.port);
      console.log('3. Firewall settings');
    }
    
    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\n🔑 Access denied. Please verify:');
      console.log('1. Username is correct');
      console.log('2. Password is correct');
      console.log('3. User has proper permissions');
    }
    
    return false;
  } finally {
    await pool.end();
    process.exit();
  }
}

testConnection();