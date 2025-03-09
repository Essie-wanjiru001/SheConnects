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
      const updateFields = [];
      const values = [];

      if (profileData.name) {
        updateFields.push('name = ?');
        values.push(profileData.name);
      }
      if (profileData.gender) {
        updateFields.push('gender = ?');
        values.push(profileData.gender);
      }
      if (profileData.phone_number) {
        updateFields.push('phone_number = ?');
        values.push(profileData.phone_number);
      }
      if (profileData.profilePicture) {
        updateFields.push('profilePicture = ?');
        values.push(profileData.profilePicture);
      }
      if (profileData.careerInterests) {
        updateFields.push('careerInterests = ?');
        values.push(profileData.careerInterests);
      }

      // Add userId at the end of values array
      values.push(userId);

      const [result] = await db.query(
        `UPDATE users SET ${updateFields.join(', ')} WHERE userID = ?`,
        values
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }
}

module.exports = User;