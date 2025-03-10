const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Updated column names to match database
    const [users] = await pool.query(
      'SELECT userID, email FROM users WHERE userID = ?',
      [decoded.id]
    );

    if (users.length === 0) {
      throw new Error('User not found');
    }

    // Map userID to id for consistency
    req.user = {
      id: users[0].userID,
      email: users[0].email
    };
    req.token = token;
    
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    res.status(401).json({ message: 'Please authenticate' });
  }
};

module.exports = auth;