const { pool } = require('../config/database');
const path = require('path');
const fs = require('fs').promises;

const scholarshipSchema = {
  type: {
    type: String,
    enum: ['Undergraduate', 'Masters', 'PhD'],
    required: true,
    default: 'Undergraduate'
  },
};

class Scholarship {
  static async createScholarship(scholarshipData) {
    try {
      console.log('Creating new scholarship...');
      const [result] = await pool.query(
        'INSERT INTO scholarships (name, image, description, eligibility, application_deadline, apply_link) VALUES (?, ?, ?, ?, ?, ?)',
        [
          scholarshipData.name, 
          scholarshipData.image, 
          scholarshipData.description, 
          scholarshipData.eligibility, 
          scholarshipData.application_deadline, 
          scholarshipData.apply_link
        ]
      );
      console.log('Scholarship created with ID:', result.insertId);
      return result.insertId;
    } catch (error) {
      console.error('Database error in createScholarship:', error);
      throw new Error('Failed to create scholarship: ' + error.message);
    }
  }

  static async getAllScholarships() {
    try {
      console.log('Fetching all scholarships...');
      const [rows] = await pool.query(`
        SELECT 
          id, 
          name, 
          image, 
          description, 
          eligibility, 
          DATE_FORMAT(application_deadline, '%Y-%m-%d') as application_deadline, 
          apply_link, 
          created_at 
        FROM scholarships 
        WHERE is_active = 1
        ORDER BY created_at DESC
      `);
      console.log('Found', rows.length, 'scholarships');
      return rows;
    } catch (error) {
      console.error('Database error in getAllScholarships:', error);
      throw new Error('Failed to fetch scholarships: ' + error.message);
    }
  }

  static async getScholarshipById(id) {
    try {
      console.log('Fetching scholarship with ID:', id);
      const [rows] = await pool.query(
        `SELECT 
          scholarshipID, 
          name, 
          image, 
          description, 
          eligibility, 
          DATE_FORMAT(application_deadline, '%Y-%m-%d') as application_deadline, 
          apply_link, 
          created_at 
        FROM scholarships 
        WHERE scholarshipID = ? AND is_active = 1`,
        [id]
      );
      return rows[0];
    } catch (error) {
      console.error('Database error in getScholarshipById:', error);
      throw new Error('Failed to fetch scholarship: ' + error.message);
    }
  }

  static async updateScholarship(id, scholarshipData) {
    try {
      if (!id) {
        throw new Error('Scholarship ID is required');
      }

      console.log('Updating scholarship with ID:', id);
      const [result] = await pool.query(
        `UPDATE scholarships 
         SET name = ?, 
             type = ?,
             description = ?, 
             eligibility = ?, 
             application_deadline = ?, 
             apply_link = ?,
             amount = ?,
             location = ?,
             updated_at = NOW()
         WHERE scholarshipID = ? AND is_active = 1`,
        [
          scholarshipData.name,
          scholarshipData.type,
          scholarshipData.description,
          scholarshipData.eligibility,
          scholarshipData.application_deadline,
          scholarshipData.apply_link,
          scholarshipData.amount,
          scholarshipData.location,
          id
        ]
      );

      if (result.affectedRows === 0) {
        throw new Error('Scholarship not found or no changes made');
      }

      return true;
    } catch (error) {
      console.error('Database error in updateScholarship:', error);
      throw new Error('Failed to update scholarship: ' + error.message);
    }
  }

  static async deleteScholarship(id) {
    try {
      // First get the scholarship to verify it exists and get image info
      const [scholarships] = await pool.query(
        'SELECT scholarshipID, image FROM scholarships WHERE scholarshipID = ? AND is_active = 1',
        [id]
      );

      if (scholarships.length === 0) {
        return {
          success: false,
          message: 'Scholarship not found or already deleted'
        };
      }

      // Perform soft delete
      const [result] = await pool.query(
        'UPDATE scholarships SET is_active = 0, updated_at = NOW() WHERE scholarshipID = ?',
        [id]
      );

      if (result.affectedRows === 0) {
        return {
          success: false,
          message: 'Failed to delete scholarship'
        };
      }

      return {
        success: true,
        message: 'Scholarship deleted successfully',
        data: scholarships[0]
      };
    } catch (error) {
      console.error('Database error in deleteScholarship:', error);
      throw error;
    }
  }

  static async getTopThreeScholarships() {
    try {
      const [rows] = await pool.query(`
        SELECT 
          scholarshipID, 
          name,
          COALESCE(image, '/placeholder-scholarship.jpg') as image,
          description, 
          eligibility,
          DATE_FORMAT(application_deadline, '%Y-%m-%d') as application_deadline,
          apply_link,
          type
        FROM scholarships 
        WHERE is_active = 1 
          AND application_deadline >= CURDATE()
        ORDER BY application_deadline ASC
        LIMIT 3
      `);
      return rows;
    } catch (error) {
      console.error('Database error in getTopThreeScholarships:', error);
      throw new Error('Failed to fetch top scholarships');
    }
  }
}

module.exports = Scholarship;