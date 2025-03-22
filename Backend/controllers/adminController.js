const { pool } = require('../config/database');

const adminController = {
  // Stats endpoint
  getStats: async (req, res) => {
    try {
      // Get counts from database
      const [[userCount]] = await pool.query('SELECT COUNT(*) as count FROM users');
      const [[scholarshipCount]] = await pool.query('SELECT COUNT(*) as count FROM scholarships');
      const [[internshipCount]] = await pool.query('SELECT COUNT(*) as count FROM internships');
      const [[eventCount]] = await pool.query('SELECT COUNT(*) as count FROM events');

      res.json({
        success: true,
        stats: {
          totalUsers: userCount.count,
          activeScholarships: scholarshipCount.count,
          activeInternships: internshipCount.count,
          upcomingEvents: eventCount.count
        }
      });
    } catch (error) {
      console.error('Stats Error:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch stats' });
    }
  },

  // User Management
  getUsers: async (req, res) => {
    try {
      const [users] = await pool.query('SELECT * FROM users');
      res.json({ success: true, users });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch users' });
    }
  },

  // Delete User
  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      // Check if trying to delete an admin
      const [user] = await pool.query(
        'SELECT is_admin FROM users WHERE userID = ?',
        [id]
      );

      if (user[0]?.is_admin) {
        return res.status(403).json({
          success: false,
          message: 'Cannot delete admin users'
        });
      }

      const [result] = await pool.query(
        'DELETE FROM users WHERE userID = ?',
        [id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete user'
      });
    }
  },

  // Internship Management  
  async getInternships(req, res) {
    try {
      const [internships] = await pool.query('SELECT * FROM internships WHERE is_active = 1');
      res.json({ success: true, internships });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch internships' });
    }
  },

  async createInternship(req, res) {
    try {
      const [result] = await pool.query('INSERT INTO internships SET ?', {
        ...req.body,
        created_at: new Date(),
        updated_at: new Date(),
        is_active: 1
      });

      res.status(201).json({
        success: true,
        message: 'Internship created successfully',
        id: result.insertId
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Failed to create internship' });
    }
  },

  async updateInternship(req, res) {
    try {
      const [result] = await pool.query(
        'UPDATE internships SET ?, updated_at = NOW() WHERE id = ? AND is_active = 1',
        [req.body, req.params.id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Internship not found' });
      }

      res.json({ success: true, message: 'Internship updated successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Failed to update internship' });
    }
  },

  async deleteInternship(req, res) {
    try {
      const [result] = await pool.query(
        'UPDATE internships SET is_active = 0 WHERE id = ?',
        [req.params.id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Internship not found' });
      }

      res.json({ success: true, message: 'Internship deleted successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Failed to delete internship' });
    }
  },

  // Event Management
  async getEvents(req, res) {
    try {
      const [events] = await pool.query('SELECT * FROM events WHERE is_active = 1');
      res.json({ success: true, events });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch events' });
    }
  },

  async createEvent(req, res) {
    try {
      const [result] = await pool.query('INSERT INTO events SET ?', {
        ...req.body,
        created_at: new Date(),
        updated_at: new Date(),
        is_active: 1
      });

      res.status(201).json({
        success: true,
        message: 'Event created successfully',
        id: result.insertId
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Failed to create event' });
    }
  },

  async updateEvent(req, res) {
    try {
      const [result] = await pool.query(
        'UPDATE events SET ?, updated_at = NOW() WHERE id = ? AND is_active = 1',
        [req.body, req.params.id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Event not found' });
      }

      res.json({ success: true, message: 'Event updated successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Failed to update event' });
    }
  },

  async deleteEvent(req, res) {
    try {
      const [result] = await pool.query(
        'UPDATE events SET is_active = 0 WHERE id = ?',
        [req.params.id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Event not found' });
      }

      res.json({ success: true, message: 'Event deleted successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Failed to delete event' });
    }
  },

  // Scholarship Management
  async getScholarships(req, res) {
    try {
      const [scholarships] = await pool.query('SELECT * FROM scholarships WHERE is_active = 1');
      res.json({ success: true, scholarships });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch scholarships' });
    }
  },

  async createScholarship(req, res) {
    try {
      const [result] = await pool.query('INSERT INTO scholarships SET ?', {
        ...req.body,
        created_at: new Date(),
        updated_at: new Date(),
        is_active: 1
      });

      res.status(201).json({
        success: true,
        message: 'Scholarship created successfully',
        id: result.insertId
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Failed to create scholarship' });
    }
  },

  async updateScholarship(req, res) {
    try {
      const [result] = await pool.query(
        'UPDATE scholarships SET ?, updated_at = NOW() WHERE scholarshipID = ? AND is_active = 1',
        [req.body, req.params.id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Scholarship not found' });
      }

      res.json({ success: true, message: 'Scholarship updated successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Failed to update scholarship' });
    }
  },

  async deleteScholarship(req, res) {
    try {
      const { id } = req.params;
      const [result] = await pool.query(
        'UPDATE scholarships SET is_active = 0 WHERE id = ?',
        [id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'Scholarship not found'
        });
      }

      res.json({
        success: true,
        message: 'Scholarship deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting scholarship:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete scholarship'
      });
    }
  }
};

module.exports = adminController;