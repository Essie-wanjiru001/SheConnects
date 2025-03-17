const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

const adminAuth = async (req, res, next) => {
  try {
    console.log('Verifying admin token');
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', decoded);

      if (!decoded.is_admin) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized as admin'
        });
      }

      // Check if user exists and is admin
      const [users] = await pool.query(
        'SELECT userID, email, name, is_admin FROM users WHERE userID = ? AND is_admin = 1',
        [decoded.id]
      );

      if (users.length === 0) {
        return res.status(401).json({
          success: false,
          message: 'Admin not found'
        });
      }

      req.user = users[0];
      next();

    } catch (error) {
      console.error('Admin Auth Error:', error);
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Token expired, please login again'
        });
      }
      throw error;
    }
  } catch (error) {
    console.error('Admin Auth Error:', error);
    res.status(401).json({
      success: false,
      message: 'Authentication failed'
    });
  }
};

module.exports = adminAuth;