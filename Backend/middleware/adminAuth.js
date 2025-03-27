const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

const adminAuth = async (req, res, next) => {
  try {
    // Check header, cookie or query token
    const token = 
      req.headers.authorization?.split(' ')[1] || 
      req.cookies?.adminToken ||
      req.query?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!decoded.is_admin) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Not an admin.'
      });
    }

    // Get admin user info
    const [users] = await pool.query(
      'SELECT userID, email, name, is_admin FROM users WHERE userID = ? AND is_admin = 1',
      [decoded.id]
    );

    if (!users.length) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin not found.'
      });
    }

    // Attach user to request
    req.user = users[0];
    next();
  } catch (error) {
    console.error('Admin auth error:', error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired'
      });
    }

    res.status(403).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

module.exports = adminAuth;