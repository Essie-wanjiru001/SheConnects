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

      // Map form fields to database columns
      const fieldMappings = {
        name: 'name',
        gender: 'gender',
        phone_number: 'phone_number',
        career_interests: 'career_interests',
        profile_image: 'profile_image'
      };

      // Build dynamic update query
      Object.entries(profileData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && fieldMappings[key]) {
          updateFields.push(`${fieldMappings[key]} = ?`);
          values.push(value);
        }
      });

      if (updateFields.length === 0) {
        return true; // No fields to update
      }

      values.push(userId);

      const query = `
        UPDATE users 
        SET ${updateFields.join(', ')} 
        WHERE userID = ?
      `;

      const [result] = await pool.query(query, values);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }
}

module.exports = User;