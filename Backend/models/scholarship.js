const db = require('../config/database');

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
      const [result] = await db.query(
        'INSERT INTO scholarships (name, image, description, eligibility, application_deadline, apply_link) VALUES (?, ?, ?, ?, ?, ?)',
        [scholarshipData.name, scholarshipData.image, scholarshipData.description, 
         scholarshipData.eligibility, scholarshipData.application_deadline, scholarshipData.apply_link]
      );
      return result.insertId;
    } catch (error) {
      throw new Error('Failed to create scholarship: ' + error.message);
    }
  }

  static async getAllScholarships() {
    try {
      const [rows] = await db.query(`
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
        ORDER BY created_at DESC`
      );
      return rows;
    } catch (error) {
      throw new Error('Failed to fetch scholarships: ' + error.message);
    }
  }

  static async getScholarshipById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM scholarships WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw new Error('Failed to fetch scholarship: ' + error.message);
    }
  }

  static async updateScholarship(id, scholarshipData) {
    try {
      const [result] = await db.query(
        'UPDATE scholarships SET name = ?, image = ?, description = ?, eligibility = ?, application_deadline = ?, apply_link = ? WHERE id = ?',
        [scholarshipData.name, scholarshipData.image, scholarshipData.description, 
         scholarshipData.eligibility, scholarshipData.application_deadline, scholarshipData.apply_link, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error('Failed to update scholarship: ' + error.message);
    }
  }

  static async deleteScholarship(id) {
    try {
      // First get the scholarship to check if it exists and get image path
      const [scholarship] = await db.query('SELECT image FROM scholarships WHERE id = ?', [id]);
      
      if (scholarship.length === 0) {
        return false;
      }

      const [result] = await db.query('DELETE FROM scholarships WHERE id = ?', [id]);

      // If deletion was successful and there was an image, return the image path
      if (result.affectedRows > 0 && scholarship[0].image) {
        return { success: true, imagePath: scholarship[0].image };
      }

      return { success: true, imagePath: null };
    } catch (error) {
      throw new Error('Failed to delete scholarship: ' + error.message);
    }
  }
}

module.exports = Scholarship;