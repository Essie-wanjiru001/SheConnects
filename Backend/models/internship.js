const { pool } = require('../config/database');

class Internship {
  static async createInternship(internshipData) {
    try {
      const [result] = await pool.query(
        `INSERT INTO internships (
          title, company, description, location, deadline,
          type, duration, isPaid, apply_link, is_active,
          created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, NOW(), NOW())`,
        [
          internshipData.title,
          internshipData.company,
          internshipData.description,
          internshipData.location,
          internshipData.deadline,
          internshipData.type,
          internshipData.duration,
          internshipData.isPaid,
          internshipData.apply_link
        ]
      );
      return result.insertId;
    } catch (error) {
      throw new Error('Failed to create internship: ' + error.message);
    }
  }

  static async getAllInternships() {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM internships WHERE is_active = 1 ORDER BY created_at DESC'
      );
      return rows;
    } catch (error) {
      throw new Error('Failed to fetch internships: ' + error.message);
    }
  }

  static async searchInternships(searchParams) {
    try {
      let query = 'SELECT * FROM internships WHERE is_active = 1';
      const queryParams = [];

      if (searchParams.search) {
        query += ` AND (title LIKE ? OR company LIKE ? OR description LIKE ?)`;
        const searchTerm = `%${searchParams.search}%`;
        queryParams.push(searchTerm, searchTerm, searchTerm);
      }

      if (searchParams.type) {
        query += ` AND type = ?`;
        queryParams.push(searchParams.type);
      }

      const [rows] = await pool.query(query, queryParams);
      return rows;
    } catch (error) {
      throw new Error('Failed to search internships: ' + error.message);
    }
  }

  static async getInternshipById(id) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM internships WHERE id = ? AND is_active = 1',
        [id]
      );
      return rows[0];
    } catch (error) {
      throw new Error('Failed to fetch internship: ' + error.message);
    }
  }

  static async updateInternship(id, internshipData) {
    try {
      const [result] = await pool.query(
        'UPDATE internships SET ? WHERE id = ? AND is_active = 1',
        [internshipData, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error('Failed to update internship: ' + error.message);
    }
  }

  static async deleteInternship(id) {
    try {
      const [result] = await pool.query(
        'UPDATE internships SET is_active = 0 WHERE id = ?',
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error('Failed to delete internship: ' + error.message);
    }
  }

  static async getTopThreeInternships() {
    try {
      const [rows] = await pool.query(`
        SELECT 
          id, title, company, description, location,
          DATE_FORMAT(deadline, '%Y-%m-%d') as deadline,
          type, duration, isPaid, apply_link
        FROM internships 
        WHERE is_active = 1 
          AND deadline >= CURDATE()
        ORDER BY deadline ASC
        LIMIT 3
      `);
      return rows;
    } catch (error) {
      console.error('Database error:', error);
      throw new Error('Failed to fetch internships');
    }
  }
}

module.exports = Internship;