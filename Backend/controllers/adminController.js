const { pool } = require('../config/database');

const adminController = {
  async getStats(req, res) {
    try {
      const [totalUsers] = await pool.query('SELECT COUNT(*) as count FROM users WHERE is_active = 1');
      const [activeScholarships] = await pool.query('SELECT COUNT(*) as count FROM scholarships WHERE is_active = 1');
      const [activeInternships] = await pool.query('SELECT COUNT(*) as count FROM internships WHERE is_active = 1');
      const [upcomingEvents] = await pool.query('SELECT COUNT(*) as count FROM events WHERE is_active = 1 AND event_date >= CURDATE()');

      res.json({
        success: true,
        totalUsers: totalUsers[0].count,
        activeScholarships: activeScholarships[0].count,
        activeInternships: activeInternships[0].count,
        upcomingEvents: upcomingEvents[0].count
      });
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch stats' });
    }
  },

  async getUsers(req, res) {
    try {
      const [users] = await pool.query(
        'SELECT userID, name, email, gender, is_admin, createdAt FROM users WHERE is_active = 1'
      );
      res.json({ success: true, users });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch users' });
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email, is_admin } = req.body;

      const [result] = await pool.query(
        'UPDATE users SET name = ?, email = ?, is_admin = ? WHERE userID = ?',
        [name, email, is_admin, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }

      res.json({ success: true, message: 'User updated successfully' });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ success: false, error: 'Failed to update user' });
    }
  },

  // Content Management Methods
  async createScholarship(req, res) {
    try {
      const result = await pool.query(
        'INSERT INTO scholarships SET ?',
        req.body
      );
      res.status(201).json({
        success: true,
        id: result.insertId,
        message: 'Scholarship created successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to create scholarship'
      });
    }
  },

  async updateScholarship(req, res) {
    // Add scholarship update logic
  },

  async deleteScholarship(req, res) {
    // Add scholarship delete logic
  },

  async createInternship(req, res) {
    // Add internship create logic
  },

  async updateInternship(req, res) {
    // Add internship update logic
  },

  async deleteInternship(req, res) {
    // Add internship delete logic
  },

  async createEvent(req, res) {
    // Add event create logic
  },

  async updateEvent(req, res) {
    // Add event update logic
  },

  async deleteEvent(req, res) {
    // Add event delete logic
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const [result] = await pool.query(
        'UPDATE users SET is_active = 0 WHERE userID = ?',
        [id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }
      res.json({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to delete user'
      });
    }
  }
};

module.exports = adminController;