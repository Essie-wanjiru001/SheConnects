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
    const [result] = await pool.execute('SELECT NOW() as time');
    console.log('✅ Successfully connected to database at:', result[0].time);
  } catch (err) {
    console.error('❌ Connection failed');
    console.error('Error details:', {
      message: err.message,
      code: err.code,
      errno: err.errno,
      sqlMessage: err.sqlMessage,
      sqlState: err.sqlState,
      host: config.host
    });
    
    console.log('\n🔍 Troubleshooting steps:');
    console.log('1. Check Google Cloud SQL instance status');
    console.log('2. Verify authorized networks includes your IP');
    console.log('3. Confirm instance public IP:', config.host);
    console.log('4. Ensure firewall allows port 3306');
  } finally {
    await pool.end();
    process.exit();
  }
}

testConnection();