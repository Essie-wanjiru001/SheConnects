const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const adminController = require('../controllers/adminController');
const adminAuth = require('../middleware/adminAuth');
const { auth } = require('../middleware/auth');
const { pool } = require('../config/database');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads/conversations',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

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
    
    // Get applications with stats
    const [applications] = await pool.query(`
      SELECT 
        sa.*,
        u.name as user_name,
        u.email,
        u.userID,
        (
          SELECT COUNT(*) 
          FROM scholarship_applications 
          WHERE scholarshipID = ? AND status = sa.status
        ) as status_count
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
    `, [scholarshipId, scholarshipId]);

    // Calculate stats
    const stats = applications.reduce((acc, app) => {
      if (!acc[app.status]) {
        acc[app.status] = app.status_count;
      }
      return acc;
    }, {});

    res.json({
      success: true,
      applications,
      stats
    });

  } catch (error) {
    console.error('Error fetching scholarship applications:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Add new route for conversation with attachment
router.post('/applications/:id/conversations', adminAuth, upload.single('attachment'), async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const attachment = req.file ? `/uploads/conversations/${req.file.filename}` : null;

    const [result] = await pool.query(`
      INSERT INTO conversations (application_id, message, attachment_url, is_admin, created_at)
      VALUES (?, ?, ?, true, NOW())
    `, [id, message, attachment]);

    res.json({
      success: true,
      conversation: {
        id: result.insertId,
        message,
        attachment_url: attachment,
        is_admin: true,
        created_at: new Date()
      }
    });
  } catch (error) {
    console.error('Error adding conversation:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Internship routes
router.get('/internships', adminAuth, adminController.getInternships);
router.post('/internships', adminAuth, adminController.createInternship);
router.put('/internships/:id', adminAuth, adminController.updateInternship);
router.delete('/internships/:id', adminAuth, adminController.deleteInternship);

router.get('/internships/:id/applications', adminAuth, async (req, res) => {
  try {
    const [applications] = await pool.query(`
      SELECT 
        ia.*,
        u.name as user_name,
        u.email as user_email
      FROM internship_applications ia
      JOIN users u ON ia.userID = u.userID
      WHERE ia.internship_id = ?
      ORDER BY ia.created_at DESC
    `, [req.params.id]);

    res.json({
      success: true,
      applications
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch internship applications'
    });
  }
});

// Update the internship stats route
router.get('/internships/:id/stats', adminAuth, async (req, res) => {
  try {
    const [applications] = await pool.query(`
      SELECT 
        ia.*,
        u.name as user_name,
        u.email as user_email,
        i.title as internship_title,
        i.company
      FROM internship_applications ia
      JOIN users u ON ia.userID = u.userID 
      JOIN internships i ON ia.internship_id = i.id
      WHERE ia.internship_id = ?
      ORDER BY ia.created_at DESC
    `, [req.params.id]);

    // Group applications by status
    const stats = {
      total: applications.length,
      IN_PROGRESS: 0,
      SUBMITTED: 0, 
      OFFER: 0,
      NO_OFFER: 0,
      applications: applications
    };

    applications.forEach(app => {
      if (stats.hasOwnProperty(app.status)) {
        stats[app.status]++;
      }
    });

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Error fetching internship stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch internship statistics'
    });
  }
});

// Event routes
router.get('/events', adminAuth, adminController.getEvents);
router.post('/events', adminAuth, adminController.createEvent);
router.put('/events/:id', adminAuth, adminController.updateEvent);
router.delete('/events/:id', adminAuth, adminController.deleteEvent);

module.exports = router;