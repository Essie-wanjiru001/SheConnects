const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const adminController = require('../controllers/adminController');
const adminAuth = require('../middleware/adminAuth');
const { auth } = require('../middleware/auth');
const { pool } = require('../config/database');
const router = express.Router();

// Admin Registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if admin exists
    const existingAdmin = await User.findByEmail(email);
    if (existingAdmin) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create admin user
    const adminData = {
      name,
      email,
      password,
      is_admin: true
    };

    const adminId = await User.create(adminData);
    res.status(201).json({ 
      message: 'Admin registered successfully', 
      adminId 
    });
  } catch (err) {
    console.error('Admin Registration Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find admin user
        const admin = await User.findByEmail(email);
        // Add debug log
        console.log('Admin found:', admin);
        if (!admin || !admin.is_admin) {
            return res.status(401).json({
                success: false,
                error: 'Invalid admin credentials'
            });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: 'Invalid admin credentials'
            });
        }

        // Generate token with admin flag
        const token = jwt.sign(
            {
                id: admin.id,
                email: admin.email,
                is_admin: true
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        // Add debug log
        console.log('Generated token:', token);

        // Send response
        res.json({
            success: true,
            message: 'Admin login successful',
            token,
            admin: {
                id: admin.id,
                name: admin.name,
                email: admin.email
            }
        });
    } catch (error) {
        console.error('Admin Login Error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Admin routes
router.get('/stats', adminAuth, adminController.getStats);

// User routes
router.get('/users', adminAuth, adminController.getUsers);
router.delete('/users/:id', adminAuth, adminController.deleteUser);

// Scholarship routes
router.get('/scholarships', adminAuth, adminController.getScholarships);
router.post('/scholarships', adminAuth, adminController.createScholarship);
router.put('/scholarships/:id', adminAuth, adminController.updateScholarship);
router.delete('/scholarships/:id', adminAuth, adminController.deleteScholarship);

// Get scholarship applications stats
router.get('/scholarships/:id/applications', adminAuth, async (req, res) => {
  try {
    const scholarshipId = req.params.id;
    
    // Verify the scholarship exists
    const [scholarships] = await pool.query(
      'SELECT * FROM scholarships WHERE scholarshipID = ?', 
      [scholarshipId]
    );

    if (scholarships.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Scholarship not found'
      });
    }

    // Get applications with user details
    const [applications] = await pool.query(`
      SELECT 
        sa.*,
        u.name as user_name,
        u.email,
        u.userID
      FROM scholarship_applications sa
      JOIN users u ON sa.userID = u.userID
      WHERE sa.scholarshipID = ?
      ORDER BY 
        CASE sa.status
          WHEN 'IN_PROGRESS' THEN 1
          WHEN 'SUBMITTED' THEN 2
          WHEN 'ACCEPTED' THEN 3
          WHEN 'REJECTED' THEN 4
        END,
        sa.last_updated DESC
    `, [scholarshipId]);

    res.json({
      success: true,
      scholarship: scholarships[0],
      applications: applications || []
    });

  } catch (error) {
    console.error('Error fetching scholarship applications:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch applications'
    });
  }
});

// Internship routes
router.get('/internships', adminAuth, adminController.getInternships);
router.post('/internships', adminAuth, adminController.createInternship);
router.put('/internships/:id', adminAuth, adminController.updateInternship);
router.delete('/internships/:id', adminAuth, adminController.deleteInternship);

// Event routes
router.get('/events', adminAuth, adminController.getEvents);
router.post('/events', adminAuth, adminController.createEvent);
router.put('/events/:id', adminAuth, adminController.updateEvent);
router.delete('/events/:id', adminAuth, adminController.deleteEvent);

module.exports = router;