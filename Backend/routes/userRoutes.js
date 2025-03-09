const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../config/multerConfig');
const User = require('../models/user');
const db = require('../config/database');

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
    const userId = req.user.id;
    
    const [rows] = await db.execute(
      `SELECT userID, name, email, gender, phone_number, 
       profilePicture, careerInterests 
       FROM users WHERE userID = ?`,
      [userId]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: 'User profile not found' });
    }


    const userProfile = {
      ...rows[0],
      profile_image: rows[0].profilePicture,
      career_interests: rows[0].careerInterests
    };

    res.json(userProfile);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch profile data' });
  }
});

module.exports = router;