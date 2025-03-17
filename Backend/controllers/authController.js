const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { pool } = require('../config/database');

// Register a new user
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Enhanced validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Password strength validation
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Check if user exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email is already registered'
      });
    }

    // Create user
    const userId = await User.create({
      name,
      email,
      password,
      is_active: 1
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      userId
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again.'
    });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    // Generate JWT token and send response
    const token = jwt.sign(
      { 
        id: user.userID, 
        email: user.email,
        name: user.name
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' } 
    );

    res.json({ 
      success: true,
      message: 'Login successful', 
      token,
      user: {
        id: user.userID,
        email: user.email,
        name: user.name
      }
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error' 
    });
  }
};

const loginAdmin = async (req, res) => {
  try {
    console.log('Admin login attempt:', req.body.email);
    const { email, password } = req.body;

    const [users] = await pool.query(
      'SELECT * FROM users WHERE email = ? AND is_admin = 1',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials'
      });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials'
      });
    }

    // Set token expiration to 24 hours from now
    const expiresIn = '24h';
    const tokenPayload = { 
      id: user.userID,
      email: user.email,
      is_admin: true,
      iat: Math.floor(Date.now() / 1000), // Issue time
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // Explicit expiration time
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);

    console.log('Admin token generated:', { userId: user.userID, isAdmin: true });

    res.json({
      success: true,
      token,
      admin: {
        id: user.userID,
        email: user.email,
        name: user.name,
        isAdmin: true
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT userID, name, email, gender, phone_number FROM users WHERE userID = ?',
      [req.user.id]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    const userProfile = {
      id: rows[0].userID,
      name: rows[0].name,
      email: rows[0].email,
      gender: rows[0].gender || '',
      phone_number: rows[0].phone_number || ''
    };

    res.json({
      success: true,
      profile: userProfile
    });
  } catch (error) {
    console.error('Get Profile Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile'
    });
  }
};

module.exports = { 
  register, 
  login, 
  loginAdmin,
  getProfile 
};
