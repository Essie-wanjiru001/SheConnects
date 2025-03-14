require('dotenv').config();
const bcrypt = require('bcryptjs');
const { pool } = require('../config/database');

async function createProductionAdmin() {
  try {
    // Use environment variables for security
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME;

    if (!adminEmail || !adminPassword || !adminName) {
      console.error('Admin credentials must be set in environment variables');
      process.exit(1);
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    // Check if admin exists
    const [existingAdmin] = await pool.query(
      'SELECT userID FROM users WHERE email = ?',
      [adminEmail]
    );

    if (existingAdmin.length > 0) {
      // Update existing admin
      await pool.query(`
        UPDATE users 
        SET password = ?, name = ?, is_admin = 1 
        WHERE email = ?
      `, [hashedPassword, adminName, adminEmail]);
      console.log('Production admin updated successfully');
    } else {
      // Create new admin
      await pool.query(`
        INSERT INTO users (email, password, name, is_admin) 
        VALUES (?, ?, ?, 1)
      `, [adminEmail, hashedPassword, adminName]);
      console.log('Production admin created successfully');
    }
  } catch (error) {
    console.error('Error creating production admin:', error);
    process.exit(1);
  }
}

createProductionAdmin();