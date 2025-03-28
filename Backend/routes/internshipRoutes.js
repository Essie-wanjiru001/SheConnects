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
    
    console.log('Fetched internships:', internships); // Debug log
    
    res.json({
      success: true,
      internships: internships
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch internships',
      error: error.message
    });
  }
});
router.get('/search', internshipController.searchInternships);
router.get('/:id', internshipController.getInternshipById);

// Admin only routes
router.post('/', adminAuth, internshipController.createInternship);
router.put('/:id', adminAuth, internshipController.updateInternship);
router.delete('/:id', adminAuth, internshipController.deleteInternship);

// Applications routes - FIXED: Move specific routes before param routes to avoid conflicts
// Get all user applications
router.get('/applications', auth, async (req, res) => {
  try {
    const userID = req.user.id;
    
    const [applications] = await pool.query(`
      SELECT 
        ia.*,
        i.title,
        i.company,
        i.location
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
      message: 'Failed to fetch applications',
      error: error.message
    });
  }
});

// Create or update an application
router.post('/applications', auth, async (req, res) => {
  try {
    // Extract data from request
    const { internshipId, status } = req.body;
    const userID = req.user.id;

    console.log('Application submission data:', {
      userID,
      internshipId,
      status,
      body: req.body
    });

    // Input validation
    if (!internshipId) {
      return res.status(400).json({
        success: false,
        message: 'Internship ID is required'
      });
    }

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    // Check if the internship exists
    const [internships] = await pool.query(
      'SELECT * FROM internships WHERE id = ?',
      [internshipId]
    );
    
    if (internships.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Internship not found'
      });
    }

    // Find existing application
    const [existing] = await pool.query(
      'SELECT * FROM internship_applications WHERE userID = ? AND internship_id = ?',
      [userID, internshipId]
    );

    let result;
    if (existing.length > 0) {
      // Update existing application
      [result] = await pool.query(
        'UPDATE internship_applications SET status = ? WHERE userID = ? AND internship_id = ?',
        [status, userID, internshipId]
      );
      console.log('Updated application:', result);
      
      return res.status(200).json({
        success: true,
        message: 'Application updated successfully',
        application: {
          id: existing[0].id,
          status: status
        }
      });
    } else {
      // Create new application
      [result] = await pool.query(
        'INSERT INTO internship_applications (userID, internship_id, status) VALUES (?, ?, ?)',
        [userID, internshipId, status]
      );
      console.log('Created new application:', result);

      return res.status(201).json({
        success: true,
        message: 'Application created successfully',
        application: {
          id: result.insertId,
          internship_id: internshipId,
          user_id: userID,
          status: status
        }
      });
    }
  } catch (error) {
    console.error('Error saving application:', error.message);
    console.error(error.stack);
    res.status(500).json({
      success: false,
      message: 'Server error saving application',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Update application status by ID
router.put('/applications/:id', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    const userID = req.user.id;
    
    // Validate input
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    // Update the application
    const [result] = await pool.query(
      'UPDATE internship_applications SET status = ? WHERE id = ? AND user_id = ?',
      [status, applicationId, userID]
    );

    // Check if anything was updated
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Application not found or you do not have permission to update it'
      });
    }

    res.json({
      success: true,
      message: 'Application updated successfully'
    });
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Delete application
router.delete('/applications/:id', auth, async (req, res) => {
  try {
    const applicationId = req.params.id;
    const userID = req.user.id;

    // Delete the application
    const [result] = await pool.query(
      'DELETE FROM internship_applications WHERE id = ? AND userID = ?',
      [applicationId, userID]
    );

    // Check if anything was deleted
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
      message: 'Server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Remove the duplicate /my-applications route as we're using /applications for everything now

// Must be last - these routes contain URL parameters which can catch other routes above
router.get('/:id', internshipController.getInternshipById);

module.exports = router;