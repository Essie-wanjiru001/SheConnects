const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

module.exports = function(req, res, next) {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token, authorization denied' 
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
  
    req.user = {
      id: decoded.id,
      userID: decoded.id, 
      email: decoded.email,
      name: decoded.name
    };
    
    next();
  } catch (err) {
    res.status(401).json({ 
      success: false, 
      message: 'Token is not valid' 
    });
  }
};