const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create({ name, email, password, gender, phone_number, is_admin = false }) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const [result] = await db.query(
        'INSERT INTO users (name, gender, email, phone_number, password, is_admin) VALUES (?, ?, ?, ?, ?, ?)',
        [name, gender, email, phone_number, hashedPassword, is_admin]
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

  static async updateProfile(userId, profileData) {
    try {
      const [result] = await db.query(
        'UPDATE users SET gender = ?, phone_number = ? WHERE id = ?',
        [profileData.gender, profileData.phone_number, userId]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }
}

module.exports = User;