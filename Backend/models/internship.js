const { pool } = require('../config/database');

class Internship {
  static async createInternship(internshipData) {
    try {
      const [result] = await db.query(
        `INSERT INTO internships (
          title, company, description, location, deadline,
          type, duration, isPaid, apply_link
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
      console.log('Starting getAllInternships query...');
      const [rows] = await pool.query(`
        SELECT 
          id, title, company, description, location,
          DATE_FORMAT(deadline, '%Y-%m-%d') as deadline,
          type, duration, isPaid, apply_link
        FROM internships 
        WHERE is_active = 1
        ORDER BY created_at DESC
      `);
      console.log('Internships found:', rows.length);
      return rows;
    } catch (error) {
      console.error('Database error in getAllInternships:', error);
      throw error;
    }
  }

  static async searchInternships(searchParams) {
    try {
      let query = `
        SELECT 
          id, title, company, description, location,
          DATE_FORMAT(deadline, '%Y-%m-%d') as deadline,
          type, duration, isPaid, apply_link,
          created_at, updated_at
        FROM internships 
        WHERE is_active = 1
      `;
      
      const queryParams = [];

      if (searchParams.search) {
        query += ` AND (
          title LIKE ? OR 
          company LIKE ? OR 
          description LIKE ? OR
          location LIKE ?
        )`;
        const searchTerm = `%${searchParams.search}%`;
        queryParams.push(searchTerm, searchTerm, searchTerm, searchTerm);
      }

      if (searchParams.type) {
        query += ` AND type = ?`;
        queryParams.push(searchParams.type);
      }

      if (searchParams.duration) {
        query += ` AND duration = ?`;
        queryParams.push(searchParams.duration);
      }

      query += ` ORDER BY created_at DESC`;

      const [rows] = await db.query(query, queryParams);
      return rows;
    } catch (error) {
      throw new Error('Failed to search internships: ' + error.message);
    }
  }

  static async getInternshipById(id) {
    try {
      const [rows] = await db.query(
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
      const [result] = await db.query(
        `UPDATE internships 
         SET title = ?, company = ?, description = ?, 
             location = ?, deadline = ?, type = ?, 
             duration = ?, isPaid = ?, apply_link = ?
         WHERE id = ? AND is_active = 1`,
        [
          internshipData.title,
          internshipData.company,
          internshipData.description,
          internshipData.location,
          internshipData.deadline,
          internshipData.type,
          internshipData.duration,
          internshipData.isPaid,
          internshipData.apply_link,
          id
        ]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error('Failed to update internship: ' + error.message);
    }
  }

  static async deleteInternship(id) {
    try {
      const [result] = await db.query(
        'UPDATE internships SET is_active = 0 WHERE id = ?',
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error('Failed to delete internship: ' + error.message);
    }
  }
}

module.exports = Internship;