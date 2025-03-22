const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Use pool.execute instead of pool.query for parameterized queries
    const [users] = await pool.execute(
      'SELECT userID, email, name, is_admin FROM users WHERE userID = ? AND is_admin = 1',
      [decoded.id]
    );

    if (users.length === 0) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized as admin'
      });
    }

    req.user = users[0];
    next();
  } catch (error) {
    console.error('Admin auth error:', error);
    res.status(403).json({
      success: false,
      message: 'Not authorized as admin'
    });
  }
};

module.exports = adminAuth;