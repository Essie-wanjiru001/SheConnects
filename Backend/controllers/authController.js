const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Debug logging
    console.log('Registration attempt:', { name, email });

    // Basic validation
    if (!name || !email || !password) {
      console.log('Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format:', email);
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Check if email already exists
    const [existingUsers] = await pool.query(
      'SELECT email FROM users WHERE email = ?', 
      [email]
    );

    if (existingUsers.length > 0) {
      console.log('Email already exists:', email);
      return res.status(400).json({
        success: false,
        message: 'Email is already registered'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const [result] = await pool.query(
      `INSERT INTO users (name, email, password) 
       VALUES (?, ?, ?)`,
      [name, email, hashedPassword]
    );

    console.log('User registered successfully:', result.insertId);

    // Return 201 Created status
    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      userId: result.insertId
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false, 
      message: 'Internal server error'
    });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email directly using pool instead of User model
    const [users] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    const user = users[0];

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
    const { email, password } = req.body;
    
    // Check for admin user
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

    // Generate JWT token and send response
    const token = jwt.sign(
      {
        id: user.userID,
        email: user.email,
        name: user.name,
        is_admin: true
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.userID,
        email: user.email,
        name: user.name,
        is_admin: true
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
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

// Export the controller
module.exports = { 
  register, 
  login, 
  loginAdmin,
  getProfile 
};
