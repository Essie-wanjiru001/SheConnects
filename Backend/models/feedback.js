const { pool } = require('../config/database');

class Feedback {
  static async create(userId, data) {
    try {
      const { category, title, description, priority, attachmentPath } = data;
      const [result] = await pool.query(
        `INSERT INTO platform_feedback 
         (user_id, category, title, description, priority, attachment_path, status, created_at) 
         VALUES (?, ?, ?, ?, ?, ?, 'PENDING', NOW())`,
        [userId, category.toLowerCase(), title, description, priority, attachmentPath]
      );
      return result.insertId;
    } catch (error) {
      throw new Error('Failed to create feedback: ' + error.message);
    }
  }

  static async getAll() {
    try {
      const [feedbacks] = await pool.query(
        `SELECT 
          f.*, 
          u.name as user_name,
          u.email as user_email
         FROM platform_feedback f
         JOIN users u ON f.user_id = u.userID
         ORDER BY 
           CASE f.status
             WHEN 'PENDING' THEN 1
             WHEN 'IN_PROGRESS' THEN 2
             WHEN 'RESOLVED' THEN 3
           END,
           f.created_at DESC`
      );
      return feedbacks;
    } catch (error) {
      throw new Error('Failed to fetch feedbacks: ' + error.message);
    }
  }

  static async getByUserId(userId) {
    try {
      const [feedbacks] = await pool.query(
        `SELECT * FROM platform_feedback 
         WHERE user_id = ? 
         ORDER BY created_at DESC`,
        [userId]
      );
      return feedbacks;
    } catch (error) {
      throw new Error('Failed to fetch user feedbacks: ' + error.message);
    }
  }

  static async updateStatus(id, status) {
    try {
      const [result] = await pool.query(
        `UPDATE platform_feedback 
         SET status = ?, 
             updated_at = NOW() 
         WHERE id = ?`,
        [status, id]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error('Failed to update feedback status: ' + error.message);
    }
  }

  static async getById(id) {
    try {
      const [feedback] = await pool.query(
        `SELECT f.*, u.name as user_name, u.email as user_email
         FROM platform_feedback f
         JOIN users u ON f.user_id = u.userID
         WHERE f.id = ?`,
        [id]
      );
      return feedback[0];
    } catch (error) {
      throw new Error('Failed to fetch feedback: ' + error.message);
    }
  }
}

module.exports = Feedback;