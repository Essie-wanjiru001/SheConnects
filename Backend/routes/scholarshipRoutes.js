const express = require('express');
const router = express.Router();
const scholarshipController = require('../controllers/scholarshipController');
const adminAuth = require('../middleware/adminAuth.js');
const upload = require('../config/multerConfig');
const { pool } = require('../config/database');

// Create scholarship (Admin only)
router.post('/', 
    adminAuth, 
    upload.single('image'), 
    scholarshipController.createScholarship
);

// Get all scholarships
router.get('/', async (req, res) => {
  try {
    const [scholarships] = await pool.query(`
      SELECT * FROM scholarships 
      WHERE is_active = 1 
      ORDER BY application_deadline DESC
    `);

    console.log('Fetched scholarships:', scholarships); // Debug log

    res.json({ scholarships }); // Return object with scholarships array
  } catch (error) {
    console.error('Scholarship fetch error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch scholarships',
      details: error.message 
    });
  }
});

// Get scholarship by ID
router.get('/:id', 
    scholarshipController.getScholarshipById
);

// Update scholarship (Admin only)
router.put('/:id', 
    adminAuth, 
    upload.single('image'), 
    scholarshipController.updateScholarship
);

// Delete scholarship (Admin only)
router.delete('/:id', 
    adminAuth, 
    scholarshipController.deleteScholarship
);

module.exports = router;