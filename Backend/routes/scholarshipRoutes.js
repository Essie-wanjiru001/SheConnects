const express = require('express');
const router = express.Router();
const scholarshipController = require('../controllers/scholarshipController');
const adminAuth = require('../middleware/adminAuth.js');
const upload = require('../config/multerConfig');
const db = require('../config/database');

// Create new scholarship (Admin only)
router.post('/', 
    adminAuth, 
    upload.single('image'), 
    scholarshipController.createScholarship
);

// Get all scholarships
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    let query = 'SELECT * FROM scholarships';
    
    if (type) {
      query += ` WHERE type = ?`;
      const [scholarships] = await db.execute(query, [type]); // Changed from pool to db
      res.json({ success: true, scholarships });
    } else {
      const [scholarships] = await db.execute(query); // Changed from pool to db
      res.json({ success: true, scholarships });
    }
  } catch (error) {
    console.error('Database error:', error); // Add error logging
    res.status(500).json({ success: false, error: error.message });
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