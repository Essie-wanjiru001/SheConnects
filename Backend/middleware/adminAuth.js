const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No token provided');
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication required' 
      });
    }

    const token = authHeader.replace('Bearer ', '');
    console.log('Verifying admin token');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);

    // Check if user exists and is an admin
    const [users] = await pool.query(
      'SELECT userID, email, is_admin FROM users WHERE email = ? AND is_admin = 1',
      [decoded.email]
    );

    if (users.length === 0) {
      console.log('User not found or not admin');
      throw new Error('Not authorized as admin');
    }

    req.user = {
      id: users[0].userID,
      email: users[0].email,
      isAdmin: true
    };

    console.log('Admin authenticated:', req.user);
    next();
  } catch (error) {
    console.error('Admin Auth Error:', error);
    res.status(403).json({ 
      success: false, 
      message: 'Not authorized as admin' 
    });
  }
};

module.exports = adminAuth;