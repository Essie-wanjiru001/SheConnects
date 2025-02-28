const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../config/multerConfig');
const User = require('../models/user');

router.put('/profile', auth, upload.single('profile_image'), async (req, res) => {
  try {
    const userId = req.user.id;
    const profileData = {
      name: req.body.name,
      gender: req.body.gender,
      phone_number: req.body.phone_number,
      profile_image: req.file ? `/uploads/profiles/${req.file.filename}` : undefined
    };

    const success = await User.updateProfile(userId, profileData);
    if (!success) {
      return res.status(400).json({ error: 'Failed to update profile' });
    }

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/profile', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Only send necessary user data
    const userData = {
      name: user.name,
      email: user.email,
      gender: user.gender,
      phone_number: user.phone_number,
      profile_image: user.profile_image
    };

    res.json(userData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;