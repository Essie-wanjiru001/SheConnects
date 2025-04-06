require('dotenv').config({ path: '.env.production' });
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

async function updateProdAdmin() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });

    console.log('✅ Connected to production database');

    // Hash the new password
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    // Update admin user
    const [result] = await connection.execute(
      'UPDATE users SET password = ? WHERE email = ? AND is_admin = 1',
      [hashedPassword, process.env.ADMIN_EMAIL]
    );

    if (result.affectedRows > 0) {
      console.log('✅ Admin password updated successfully');
    } else {
      console.log('❌ Admin user not found');
    }

    await connection.end();
  } catch (error) {
    console.error('Error updating admin:', error);
    process.exit(1);
  }
}

updateProdAdmin();