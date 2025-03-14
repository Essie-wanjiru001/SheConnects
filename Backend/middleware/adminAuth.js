const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

const adminAuth = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user exists and is admin
    const [users] = await pool.query(
      'SELECT * FROM users WHERE userID = ? AND is_admin = 1',
      [decoded.id]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized as admin'
      });
    }

    req.user = users[0];
    next();
  } catch (error) {
    console.error('Auth Error:', error);
    res.status(401).json({
      success: false,
      message: 'Not authorized'
    });
  }
};

module.exports = adminAuth;