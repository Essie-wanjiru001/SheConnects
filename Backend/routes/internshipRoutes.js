const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const internshipController = require('../controllers/internshipController');
const adminAuth = require('../middleware/adminAuth');
const auth = require('../middleware/auth');

// Public routes
router.get('/', async (req, res) => {
  try {
    const [internships] = await pool.query(
      'SELECT * FROM internships WHERE is_active = 1 ORDER BY created_at DESC'
    );
    res.json({
      success: true,
      internships
    });
  } catch (error) {
    console.error('Error fetching internships:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch internships'
    });
  }
});
router.get('/search', internshipController.searchInternships);

// Applications routes - Keep these before param routes
router.get('/applications', auth, async (req, res) => {
  try {
    const userID = req.user.userID; // Note: using userID instead of id
    
    const [applications] = await pool.query(`
      SELECT 
        ia.*,
        i.title,
        i.company,
        i.location,
        i.deadline
      FROM internship_applications ia
      JOIN internships i ON ia.internship_id = i.id
      WHERE ia.userID = ?
      ORDER BY ia.created_at DESC
    `, [userID]);

    res.json({
      success: true,
      applications
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications'
    });
  }
});

router.post('/applications', auth, async (req, res) => {
  try {
    const { internshipId, status } = req.body;
    const userID = req.user.userID; // Using userID from auth middleware

    // Add validation
    if (!internshipId || !status) {
      return res.status(400).json({
        success: false,
        message: 'internshipId and status are required'
      });
    }

    // Debug log
    console.log('Creating application with:', { userID, internshipId, status });

    // Check for existing application
    const [existing] = await pool.query(
      'SELECT * FROM internship_applications WHERE userID = ? AND internship_id = ?',
      [userID, internshipId]
    );

    if (existing.length > 0) {
      // Update existing application
      await pool.query(
        'UPDATE internship_applications SET status = ?, updated_at = NOW() WHERE userID = ? AND internship_id = ?',
        [status, userID, internshipId]
      );
    } else {
      // Create new application
      await pool.query(
        'INSERT INTO internship_applications (userID, internship_id, status) VALUES (?, ?, ?)',
        [userID, internshipId, status]
      );
    }

    res.json({
      success: true,
      message: existing.length > 0 ? 'Application updated' : 'Application created'
    });
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process application',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

router.put('/applications/:id', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    const userID = req.user.id;
    
    // Validate status
    const validStatuses = ['IN_PROGRESS', 'SUBMITTED', 'OFFER', 'NO_OFFER'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    // Update the application
    const [result] = await pool.query(
      'UPDATE internship_applications SET status = ?, updated_at = NOW() WHERE id = ? AND userID = ?',
      [status, applicationId, userID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Application not found or you do not have permission to update it'
      });
    }

    res.json({
      success: true,
      message: 'Application status updated successfully'
    });
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update application status'
    });
  }
});

// Add DELETE route for applications
router.delete('/applications/:id', auth, async (req, res) => {
  try {
    const applicationId = req.params.id;
    const userID = req.user.id;

    const [result] = await pool.query(
      'DELETE FROM internship_applications WHERE id = ? AND userID = ?',
      [applicationId, userID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Application not found or you do not have permission to delete it'
      });
    }

    res.json({
      success: true,
      message: 'Application deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete application'
    });
  }
});

// Admin routes
router.post('/', adminAuth, internshipController.createInternship);
router.put('/:id', adminAuth, internshipController.updateInternship);
router.delete('/:id', adminAuth, internshipController.deleteInternship);

// Must be last - parameter routes
router.get('/:id', internshipController.getInternshipById);

module.exports = router;