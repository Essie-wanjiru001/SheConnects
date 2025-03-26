const express = require('express');
const router = express.Router();
const scholarshipController = require('../controllers/scholarshipController');
const adminAuth = require('../middleware/adminAuth');
const auth = require('../middleware/auth');
const { pool } = require('../config/database');
const Scholarship = require('../models/scholarship'); 

// Create scholarship (Admin only)
router.post('/', adminAuth, scholarshipController.createScholarship);

// Get scholarships with search
router.get('/', async (req, res) => {
  try {
    const { search, type } = req.query;
    let query = `
      SELECT scholarshipID, name, description, eligibility, 
             application_deadline, apply_link, type 
      FROM scholarships 
      WHERE is_active = 1
    `;

    const queryParams = [];

    if (search) {
      query += ` AND (
        name LIKE ? OR 
        description LIKE ? OR 
        eligibility LIKE ?
      )`;
      const searchTerm = `%${search}%`;
      queryParams.push(searchTerm, searchTerm, searchTerm);
    }

    if (type) {
      query += ` AND type = ?`;
      queryParams.push(type);
    }

    query += ' ORDER BY application_deadline DESC';

    const [scholarships] = await pool.query(query, queryParams);
    
    res.json({ scholarships });
  } catch (error) {
    console.error('Scholarship search error:', error);
    res.status(500).json({ 
      error: 'Failed to search scholarships',
      details: error.message 
    });
  }
});

// Get top three scholarships
router.get('/top', async (req, res) => {
  try {
    const scholarships = await Scholarship.getTopThreeScholarships();
    res.json(scholarships);
  } catch (error) {
    console.error('Error fetching top scholarships:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch top scholarships' 
    });
  }
});

// Get user's scholarship applications
router.get('/my-applications', auth, async (req, res) => {
  try {
    const userID = req.user.id; // Using id from JWT token

    // Get user's applications with scholarship details
    const [applications] = await pool.query(`
      SELECT 
        sa.*,
        s.*,
        sa.status as application_status
      FROM scholarship_applications sa
      JOIN scholarships s ON sa.scholarshipID = s.scholarshipID
      WHERE sa.userID = ?
      ORDER BY sa.last_updated DESC
    `, [userID]);

    console.log('User applications found:', applications); // Debug log

    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch applications' 
    });
  }
});

// Update application status
router.put('/applications/:id', auth, async (req, res) => {
  try {
    const { status, notes } = req.body;
    await pool.query(`
      UPDATE scholarship_applications
      SET status = ?, notes = ?
      WHERE id = ? AND userID = ?
    `, [status, notes, req.params.id, req.user.userID]);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update application' 
    });
  }
});

// Add this new route to handle notes updates
router.put('/applications/:id/notes', auth, async (req, res) => {
  try {
    const { notes } = req.body;
    const applicationId = req.params.id;

    // Validate input
    if (!notes) {
      return res.status(400).json({
        success: false,
        error: 'Notes are required'
      });
    }

    // Update the application notes
    await pool.query(`
      UPDATE scholarship_applications 
      SET notes = ?, last_updated = CURRENT_TIMESTAMP
      WHERE id = ? AND userID = ?
    `, [notes, applicationId, req.user.id]);

    res.json({
      success: true,
      message: 'Notes updated successfully'
    });

  } catch (error) {
    console.error('Error updating notes:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update notes'
    });
  }
});

router.post('/applications', auth, async (req, res) => {
  try {
    const { scholarshipID, status } = req.body;
    const userID = req.user.id; 

    // Debug logging
    console.log('Request data:', { scholarshipID, status, userID });

    // Input validation
    if (!scholarshipID) {
      return res.status(400).json({
        success: false,
        error: 'ScholarshipID is required'
      });
    }

    // Check if scholarship exists
    const [scholarship] = await pool.query(
      'SELECT scholarshipID FROM scholarships WHERE scholarshipID = ?',
      [scholarshipID]
    );

    if (!scholarship.length) {
      return res.status(404).json({
        success: false,
        error: 'Scholarship not found'
      });
    }

    // Check for existing application
    const [existingApplication] = await pool.query(
      'SELECT id FROM scholarship_applications WHERE userID = ? AND scholarshipID = ?',
      [userID, scholarshipID]
    );

    if (existingApplication.length > 0) {
      // Update existing application
      await pool.query(
        'UPDATE scholarship_applications SET status = ? WHERE userID = ? AND scholarshipID = ?',
        [status, userID, scholarshipID]
      );

      return res.json({
        success: true,
        message: 'Application status updated successfully'
      });
    }

    // Create new application
    const [result] = await pool.query(
      'INSERT INTO scholarship_applications (userID, scholarshipID, status) VALUES (?, ?, ?)',
      [userID, scholarshipID, status]
    );

    res.json({
      success: true,
      applicationId: result.insertId,
      message: 'Application created successfully'
    });

  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create application',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get scholarship by ID
router.get('/:id', 
    scholarshipController.getScholarshipById
);

// Update scholarship (Admin only)
router.put('/:id', adminAuth, scholarshipController.updateScholarship);

// Delete scholarship (Admin only)
router.delete('/:id', adminAuth, scholarshipController.deleteScholarship);

module.exports = router;