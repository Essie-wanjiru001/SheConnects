require('dotenv').config();
const bcrypt = require('bcryptjs');
const { pool } = require('../config/database');

async function createOrUpdateAdmin(email, password, name) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Check if admin exists
    const [existingAdmin] = await pool.query(
      'SELECT userID FROM users WHERE email = ?',
      [email]
    );

    if (existingAdmin.length > 0) {
      // Update existing admin
      const [result] = await pool.query(`
        UPDATE users 
        SET password = ?, name = ?, is_admin = 1 
        WHERE email = ?
      `, [hashedPassword, name, email]);

      console.log('Admin updated successfully');
    } else {
      // Create new admin
      const [result] = await pool.query(`
        INSERT INTO users (email, password, name, is_admin) 
        VALUES (?, ?, ?, 1)
      `, [email, hashedPassword, name]);

      console.log('Admin created successfully:', result.insertId);
    }
    process.exit(0);
  } catch (error) {
    console.error('Error managing admin:', error);
    process.exit(1);
  }
}


const [email, password, name] = process.argv.slice(2);

if (!email || !password || !name) {
  console.error('Usage: node createAdmin.js <email> <password> <name>');
  process.exit(1);
}

createOrUpdateAdmin(email, password, name);