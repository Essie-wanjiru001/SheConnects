const db = require('../config/database');

class Internship {
  static async createInternship(internshipData) {
    try {
      const [result] = await db.query(
        'INSERT INTO internships (name, brief_description, role, deadline, apply_link) VALUES (?, ?, ?, ?, ?)',
        [
          internshipData.name,
          internshipData.brief_description,
          internshipData.role,
          internshipData.deadline,
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
      const [rows] = await db.query(`
        SELECT 
          id, 
          name, 
          brief_description, 
          role,
          DATE_FORMAT(deadline, '%Y-%m-%d %H:%i') as deadline,
          apply_link,
          createdAt,
          updatedAt
        FROM internships 
        ORDER BY createdAt DESC
      `);
      return rows;
    } catch (error) {
      throw new Error('Failed to fetch internships: ' + error.message);
    }
  }

  static async getInternshipById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM internships WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw new Error('Failed to fetch internship: ' + error.message);
    }
  }

  static async updateInternship(id, internshipData) {
    try {
      const [result] = await db.query(
        'UPDATE internships SET name = ?, brief_description = ?, role = ?, deadline = ?, apply_link = ? WHERE id = ?',
        [
          internshipData.name,
          internshipData.brief_description,
          internshipData.role,
          internshipData.deadline,
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
      const [result] = await db.query('DELETE FROM internships WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error('Failed to delete internship: ' + error.message);
    }
  }
}

module.exports = Internship;