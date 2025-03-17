const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false,
        message: 'Authentication required' 
      });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user exists
    const [users] = await pool.query(
      'SELECT userID, email, name FROM users WHERE userID = ?',
      [decoded.id]
    );

    if (users.length === 0) {
      throw new Error('User not found');
    }

    req.user = {
      id: users[0].userID,
      email: users[0].email,
      name: users[0].name
    };
    
    next();
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: 'Please authenticate' 
    });
  }
};

module.exports = auth;