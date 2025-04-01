const { pool } = require('../config/database');

class Forum {
  static async createForum(userId, { title, description, category }) {
    try {
      const [result] = await pool.query(
        'INSERT INTO forums (user_id, title, description, category, created_at) VALUES (?, ?, ?, ?, NOW())',
        [userId, title, description, category]
      );
      return result.insertId;
    } catch (error) {
      throw new Error('Failed to create forum: ' + error.message);
    }
  }

  static async getAllForums() {
    try {
      const [forums] = await pool.query(`
        SELECT 
          f.*,
          u.name as creator_name,
          COUNT(DISTINCT d.id) as discussions_count
        FROM forums f
        JOIN users u ON f.user_id = u.userID
        LEFT JOIN forum_discussions d ON d.forum_id = f.id AND d.is_active = 1
        WHERE f.is_active = 1
        GROUP BY f.id
        ORDER BY f.created_at DESC
      `);
      return forums;
    } catch (error) {
      throw new Error('Failed to fetch forums: ' + error.message);
    }
  }

  static async getForumById(forumId) {
    try {
      const [forum] = await pool.query(`
        SELECT 
          f.*,
          u.name as creator_name
        FROM forums f
        JOIN users u ON f.user_id = u.userID
        WHERE f.id = ? AND f.is_active = 1
      `, [forumId]);

      const [discussions] = await pool.query(`
        SELECT 
          d.*,
          u.name as author_name,
          u.profile_image as author_image,
          COUNT(r.id) as replies_count
        FROM forum_discussions d
        JOIN users u ON d.user_id = u.userID
        LEFT JOIN discussion_replies r ON r.discussion_id = d.id AND r.is_active = 1
        WHERE d.forum_id = ? AND d.is_active = 1
        GROUP BY d.id
        ORDER BY d.created_at DESC
      `, [forumId]);

      return {
        forum: forum[0],
        discussions
      };
    } catch (error) {
      throw new Error('Failed to fetch forum details: ' + error.message);
    }
  }

  static async getForumDiscussions(forumId) {
    try {
      const [discussions] = await pool.query(`
        SELECT 
          d.*,
          u.name as author_name,
          u.userID as user_id 
        FROM forum_discussions d
        JOIN users u ON d.user_id = u.userID
        WHERE d.forum_id = ? AND d.is_active = 1
        ORDER BY d.created_at DESC
      `, [forumId]);

      return discussions;
    } catch (error) {
      throw new Error('Failed to fetch discussions: ' + error.message);
    }
  }

  static async createDiscussion(forumId, userId, content) {
    try {
      const [result] = await pool.query(
        'INSERT INTO forum_discussions (forum_id, user_id, content) VALUES (?, ?, ?)',
        [forumId, userId, content]
      );

      const [discussion] = await pool.query(`
        SELECT 
          d.*,
          u.name as author_name,
          d.user_id
        FROM forum_discussions d
        JOIN users u ON d.user_id = u.userID
        WHERE d.id = ?
      `, [result.insertId]);

      return discussion[0];
    } catch (error) {
      throw new Error('Failed to create discussion: ' + error.message);
    }
  }

  static async getReplies(discussionId) {
    try {
      const [replies] = await pool.query(`
        SELECT 
          r.*,
          u.name as author_name,
          r.user_id
        FROM discussion_replies r
        JOIN users u ON r.user_id = u.userID
        WHERE r.discussion_id = ? AND r.is_active = 1
        ORDER BY r.created_at ASC
      `, [discussionId]);

      return replies;
    } catch (error) {
      throw new Error('Failed to fetch replies: ' + error.message);
    }
  }

  static async createReply(discussionId, userId, content) {
    try {
      const [result] = await pool.query(
        'INSERT INTO discussion_replies (discussion_id, user_id, content) VALUES (?, ?, ?)',
        [discussionId, userId, content]
      );

      const [reply] = await pool.query(`
        SELECT 
          r.*,
          u.name as author_name
        FROM discussion_replies r
        JOIN users u ON r.user_id = u.userID
        WHERE r.id = ?
      `, [result.insertId]);

      return reply[0];
    } catch (error) {
      throw new Error('Failed to create reply: ' + error.message);
    }
  }

  static async updateDiscussion(discussionId, userId, content) {
    try {
      const [result] = await pool.query(
        'UPDATE forum_discussions SET content = ?, updated_at = NOW() WHERE id = ? AND user_id = ?',
        [content, discussionId, userId]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error('Failed to update discussion: ' + error.message);
    }
  }

  static async updateReply(replyId, userId, content) {
    try {
      const [result] = await pool.query(
        'UPDATE discussion_replies SET content = ?, updated_at = NOW() WHERE id = ? AND user_id = ?',
        [content, replyId, userId]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error('Failed to update reply: ' + error.message);
    }
  }

  static async deleteDiscussion(discussionId, userId) {
    try {
      const [result] = await pool.query(
        'UPDATE forum_discussions SET is_active = 0 WHERE id = ? AND user_id = ?',
        [discussionId, userId]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error('Failed to delete discussion: ' + error.message);
    }
  }

  static async deleteReply(replyId, userId) {
    try {
      const [result] = await pool.query(
        'UPDATE discussion_replies SET is_active = 0 WHERE id = ? AND user_id = ?',
        [replyId, userId]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error('Failed to delete reply: ' + error.message);
    }
  }
}

module.exports = Forum;