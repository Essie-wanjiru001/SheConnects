const express = require('express');
const router = express.Router();
const Internship = require('../models/internship');
const adminAuth = require('../middleware/adminAuth');
const multer = require('multer');
const upload = multer();

// Create new internship (Admin only) with form-data
router.post('/', adminAuth, upload.none(), async (req, res) => {
    try {
        // Debug log
        console.log('Received form data:', req.body);

        // Validate form data
        if (!req.body.name || !req.body.brief_description || !req.body.role || !req.body.apply_link) {
            return res.status(400).json({
                success: false,
                error: 'All fields are required'
            });
        }

        const internshipData = {
            name: req.body.name.trim(),
            brief_description: req.body.brief_description.trim(),
            role: req.body.role.trim(),
            deadline: req.body.deadline,
            apply_link: req.body.apply_link.trim()
        };

        // Debug log
        console.log('Processed internship data:', internshipData);

        const internshipId = await Internship.createInternship(internshipData);
        res.status(201).json({
            success: true,
            message: 'Internship created successfully',
            internshipId
        });
    } catch (error) {
        console.error('Error creating internship:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Get all internships
router.get('/', async (req, res) => {
  try {
    const internships = await Internship.getAllInternships();
    res.json({
      success: true,
      count: internships.length,
      internships
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get internship by ID 
router.get('/:id', async (req, res) => {
  try {
    const internship = await Internship.getInternshipById(req.params.id);
    if (!internship) {
      return res.status(404).json({ success: false, error: 'Internship not found' });
    }
    res.json({ success: true, internship });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update internship (Admin only)
router.put('/:id', adminAuth, upload.none(), async (req, res) => {
  try {
    const internshipData = {
      name: req.body.name,
      brief_description: req.body.brief_description,
      role: req.body.role,
      deadline: req.body.deadline,
      apply_link: req.body.apply_link
    };

    const success = await Internship.updateInternship(req.params.id, internshipData);
    if (!success) {
      return res.status(404).json({ success: false, error: 'Internship not found' });
    }
    res.json({ success: true, message: 'Internship updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete internship (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const success = await Internship.deleteInternship(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, error: 'Internship not found' });
    }
    res.json({ success: true, message: 'Internship deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;