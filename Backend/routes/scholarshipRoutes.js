const express = require('express');
const router = express.Router();
const Scholarship = require('../models/scholarship');
const adminAuth = require('../middleware/adminAuth.js');
const upload = require('../config/multerConfig');
const fs = require('fs').promises;
const path = require('path');

// Create new scholarship with form data (Admin only)
router.post('/', adminAuth, upload.single('image'), async (req, res) => {
    try {
        const scholarshipData = {
            name: req.body.name,
            description: req.body.description,
            eligibility: req.body.eligibility,
            application_deadline: req.body.application_deadline,
            apply_link: req.body.apply_link,
            image: req.file ? `/uploads/scholarships/${req.file.filename}` : null
        };

        const scholarshipId = await Scholarship.createScholarship(scholarshipData);
        res.status(201).json({
            success: true,
            message: 'Scholarship created successfully',
            scholarshipId
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get all scholarships
router.get('/', async (req, res) => {
  try {
    const scholarships = await Scholarship.getAllScholarships();
    res.json({
      success: true,
      count: scholarships.length,
      scholarships
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get scholarship by ID
router.get('/:id', async (req, res) => {
  try {
    const scholarship = await Scholarship.getScholarshipById(req.params.id);
    if (!scholarship) {
      return res.status(404).json({ success: false, error: 'Scholarship not found' });
    }
    res.json({ success: true, scholarship });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update scholarship with form data (Admin only)
router.put('/:id', adminAuth, upload.single('image'), async (req, res) => {
    try {
        const scholarshipData = {
            name: req.body.name,
            description: req.body.description,
            eligibility: req.body.eligibility,
            application_deadline: req.body.application_deadline,
            apply_link: req.body.apply_link
        };

        if (req.file) {
            scholarshipData.image = `/uploads/scholarships/${req.file.filename}`;
        }

        const success = await Scholarship.updateScholarship(req.params.id, scholarshipData);
        if (!success) {
            return res.status(404).json({ success: false, error: 'Scholarship not found' });
        }
        res.json({ success: true, message: 'Scholarship updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Delete scholarship (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const result = await Scholarship.deleteScholarship(req.params.id);
    
    if (!result.success) {
      return res.status(404).json({
        success: false,
        error: 'Scholarship not found'
      });
    }

    // Delete image file if it exists
    if (result.imagePath) {
      const imagePath = path.join(__dirname, '..', result.imagePath);
      try {
        await fs.unlink(imagePath);
      } catch (error) {
        console.error('Error deleting image file:', error);
      }
    }

    res.json({
      success: true,
      message: 'Scholarship deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;