const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Auth token:', token); // Debug log

    if (!token) {
      throw new Error('No token provided');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded user:', decoded); // Debug log

    req.user = decoded;
    next();
  } catch (error) {
    console.error('Auth error:', error); // Debug log
    res.status(401).json({ error: 'Please authenticate' });
  }
};

module.exports = auth;