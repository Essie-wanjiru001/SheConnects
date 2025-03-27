const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const adminController = require('../controllers/adminController');
const adminAuth = require('../middleware/adminAuth');
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

// Apply admin middleware to all routes
router.use(adminAuth);

// Stats route
router.get('/stats', adminController.getStats);

// User routes
router.get('/users', adminController.getUsers);
router.delete('/users/:id', adminController.deleteUser);

// Scholarship routes
router.get('/scholarships', adminController.getScholarships);
router.post('/scholarships', adminController.createScholarship);
router.put('/scholarships/:id', adminController.updateScholarship);
router.delete('/scholarships/:id', adminAuth, adminController.deleteScholarship);

// Internship routes
router.get('/internships', adminController.getInternships);
router.post('/internships', adminController.createInternship);
router.put('/internships/:id', adminController.updateInternship);
router.delete('/internships/:id', adminController.deleteInternship);

// Event routes
router.get('/events', adminController.getEvents);
router.post('/events', adminController.createEvent);
router.put('/events/:id', adminController.updateEvent);
router.delete('/events/:id', adminController.deleteEvent);

module.exports = router;