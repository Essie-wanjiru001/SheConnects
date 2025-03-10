const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../config/multerConfig');
const { pool } = require('../config/database');
const User = require('../models/user');

router.put('/profile', auth, upload.single('file'), async (req, res) => {
  try {
    const userId = req.user.id;
    const profileData = {
      ...req.body,
      profilePicture: req.file ? `/uploads/profiles/${req.file.filename}` : undefined
    };

    const success = await User.updateProfile(userId, profileData);
    
    if (!success) {
      return res.status(400).json({ error: 'Failed to update profile' });
    }

    res.json({ 
      message: 'Profile updated successfully',
      profilePicture: profileData.profilePicture
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

router.get('/profile', auth, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT userID, name, email, gender, phone_number FROM users WHERE userID = ?',
      [req.user.id]
    );

    if (!rows || rows.length === 0) {
      // Return empty profile structure instead of 404
      return res.json({
        id: req.user.id,
        name: '',
        email: req.user.email,
        gender: '',
        phone_number: '',
        profilePicture: null,
        careerInterests: ''
      });
    }

    const userProfile = {
      id: rows[0].userID,
      name: rows[0].name || '',
      email: rows[0].email,
      gender: rows[0].gender || '',
      phone_number: rows[0].phone_number || '',
      profilePicture: rows[0].profilePicture || null,
      careerInterests: rows[0].careerInterests || ''
    };

    res.json(userProfile);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch profile data' });
  }
});

module.exports = router;