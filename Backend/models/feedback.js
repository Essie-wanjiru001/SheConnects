const { pool } = require('../config/database');

class Feedback {
  static async create(userId, data) {
    try {
      const { category, title, description, priority, attachmentPath } = data;
      const [result] = await pool.query(
        `INSERT INTO platform_feedback 
         (user_id, category, title, description, priority, attachment_path, status, created_at) 
         VALUES (?, ?, ?, ?, ?, ?, 'PENDING', NOW())`,
        [userId, category, title, description, priority, attachmentPath]
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
          u.name as user_name
         FROM platform_feedback f
         JOIN users u ON f.user_id = u.userID
         ORDER BY f.created_at DESC`
      );
      return feedbacks;
    } catch (error) {
      throw new Error('Failed to fetch feedbacks: ' + error.message);
    }
  }

  static async getByUserId(userId) {
    try {
      const [feedbacks] = await pool.query(
        `SELECT 
          f.id, f.category, f.title, f.description, f.priority,
          f.attachment_path, f.status, f.created_at,
          u.name as user_name
         FROM platform_feedback f
         JOIN users u ON f.user_id = u.userID
         WHERE f.user_id = ? 
         ORDER BY f.created_at DESC`,
        [userId]
      );
      return feedbacks;
    } catch (error) {
      throw new Error('Failed to fetch user feedbacks: ' + error.message);
    }
  }

  static async updateStatus(feedbackId, status) {
    try {
      const [result] = await pool.query(
        'UPDATE platform_feedback SET status = ? WHERE id = ?',
        [status, feedbackId]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error('Failed to update feedback status: ' + error.message);
    }
  }
}

module.exports = Feedback;