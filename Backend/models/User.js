const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create({ name, email, password, is_admin = false }) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const [result] = await db.query(
        'INSERT INTO users (name, email, password, is_admin) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, is_admin]
      );
      return result.insertId;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      return rows[0] || null;
    } catch (error) {
      console.error('Error finding user:', error);
      throw error;
    }
  }
}

module.exports = User;