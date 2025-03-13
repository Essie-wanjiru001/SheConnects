const { pool } = require('../config/database');

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
          id, 
          name, 
          image, 
          description, 
          eligibility, 
          DATE_FORMAT(application_deadline, '%Y-%m-%d') as application_deadline, 
          apply_link, 
          created_at 
        FROM scholarships 
        WHERE id = ? AND is_active = 1`,
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
      console.log('Updating scholarship with ID:', id);
      const [result] = await pool.query(
        `UPDATE scholarships 
         SET name = ?, image = ?, description = ?, 
             eligibility = ?, application_deadline = ?, apply_link = ? 
         WHERE id = ? AND is_active = 1`,
        [
          scholarshipData.name, 
          scholarshipData.image, 
          scholarshipData.description, 
          scholarshipData.eligibility, 
          scholarshipData.application_deadline, 
          scholarshipData.apply_link, 
          id
        ]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Database error in updateScholarship:', error);
      throw new Error('Failed to update scholarship: ' + error.message);
    }
  }

  static async deleteScholarship(id) {
    try {
      console.log('Soft deleting scholarship with ID:', id);
      // First get the scholarship to check if it exists and get image path
      const [scholarship] = await pool.query(
        'SELECT image FROM scholarships WHERE id = ? AND is_active = 1', 
        [id]
      );
      
      if (scholarship.length === 0) {
        return false;
      }

      // Soft delete by updating is_active flag
      const [result] = await pool.query(
        'UPDATE scholarships SET is_active = 0 WHERE id = ?',
        [id]
      );

      // If deletion was successful and there was an image, return the image path
      if (result.affectedRows > 0 && scholarship[0].image) {
        return { success: true, imagePath: scholarship[0].image };
      }

      return { success: true, imagePath: null };
    } catch (error) {
      console.error('Database error in deleteScholarship:', error);
      throw new Error('Failed to delete scholarship: ' + error.message);
    }
  }

  static async getTopThreeScholarships() {
    try {
      const [rows] = await pool.query(`
        SELECT 
          id, 
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