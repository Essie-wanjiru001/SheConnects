const express = require('express');
const router = express.Router();
const scholarshipController = require('../controllers/scholarshipController');
const adminAuth = require('../middleware/adminAuth');
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

// Get scholarship by ID
router.get('/:id', 
    scholarshipController.getScholarshipById
);

// Update scholarship (Admin only)
router.put('/:id', adminAuth, scholarshipController.updateScholarship);

// Delete scholarship (Admin only)
router.delete('/:id', adminAuth, scholarshipController.deleteScholarship);

module.exports = router;