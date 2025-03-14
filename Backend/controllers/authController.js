const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Register a new user
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'Email already exists' 
      });
    }

    // Create user
    const userId = await User.create({ name, email, password });
    res.status(201).json({ 
      success: true,
      message: 'User registered successfully', 
      userId 
    });
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error' 
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
    const { email, password } = req.body;

    // Check if user exists and is admin
    const [users] = await pool.query(
      'SELECT * FROM users WHERE email = ? AND is_admin = 1',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate admin token
    const token = jwt.sign(
      { 
        email: user.email,
        is_admin: true
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      success: true,
      token,
      user: {
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
      message: 'Server error'
    });
  }
};

module.exports = { register, login, loginAdmin };
