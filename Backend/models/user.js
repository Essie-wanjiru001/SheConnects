const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create({ name, email, password, gender = null, phone_number = null }) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const [result] = await pool.execute(
        'INSERT INTO users (name, email, password, gender, phone_number) VALUES (?, ?, ?, ?, ?)',
        [name, email, hashedPassword, gender, phone_number]
      );
      return result.insertId;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      return rows[0];
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

      values.push(userId);

      const [result] = await pool.query(
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