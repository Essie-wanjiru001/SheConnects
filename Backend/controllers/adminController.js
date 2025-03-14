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

  // Internship Management  
  getInternships: async (req, res) => {
    try {
      const [internships] = await pool.query('SELECT * FROM internships');
      res.json({ success: true, internships });
    } catch (error) {
      console.error('Error fetching internships:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch internships' });
    }
  },

  // Event Management
  getEvents: async (req, res) => {
    try {
      const [events] = await pool.query('SELECT * FROM events');
      res.json({ success: true, events });
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch events' });
    }
  },

  // Scholarship Management
  async getScholarships(req, res) {
    try {
      console.log('Fetching scholarships...');
      const [scholarships] = await pool.query(`
        SELECT 
          id, name, type, amount, location,
          application_deadline, is_active,
          funding_type, description, eligibility,
          apply_link, source
        FROM scholarships 
        WHERE is_active = 1
        ORDER BY application_deadline DESC
      `);

      console.log(`Found ${scholarships.length} scholarships`);
      res.json({
        success: true,
        scholarships
      });
    } catch (error) {
      console.error('Error fetching scholarships:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch scholarships'
      });
    }
  },

  async createScholarship(req, res) {
    try {
      const {
        name, description, eligibility, application_deadline,
        apply_link, amount, source, source_url, type,
        funding_type, location, image
      } = req.body;

      const [result] = await pool.query(`
        INSERT INTO scholarships SET ?
      `, {
        name, description, eligibility, application_deadline,
        apply_link, amount, source, source_url, type,
        funding_type, location, image,
        is_active: 1
      });

      res.status(201).json({
        success: true,
        message: 'Scholarship created successfully',
        id: result.insertId
      });
    } catch (error) {
      console.error('Error creating scholarship:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create scholarship'
      });
    }
  }
};

module.exports = adminController;