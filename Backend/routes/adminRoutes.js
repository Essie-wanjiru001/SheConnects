const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
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

module.exports = router;