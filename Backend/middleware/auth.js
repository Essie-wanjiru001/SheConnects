const jwt = require('jsonwebtoken');
const db = require('../config/database');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user ID from database using email
    const [rows] = await db.execute(
      'SELECT userID FROM users WHERE email = ?',
      [decoded.email]
    );

    if (!rows || rows.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = {
      id: rows[0].userID,
      email: decoded.email
    };
    
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = auth;