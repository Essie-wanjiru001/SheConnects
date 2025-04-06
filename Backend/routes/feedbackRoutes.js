const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const Feedback = require('../models/feedback'); 
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const upload = require('../config/multerConfig');

// Submit new feedback
router.post('/', 
  auth, 
  upload.single('attachment'), 
  feedbackController.submitFeedback
);

// Get user's feedbacks
router.get('/my-feedbacks', 
  auth, 
  feedbackController.getUserFeedbacks
);

// Admin routes
router.get('/all', 
  auth, 
  adminAuth, 
  feedbackController.getAllFeedbacks
);

router.patch('/:id/status', 
  auth, 
  adminAuth, 
  async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Validate status
      const validStatuses = ['PENDING', 'IN_PROGRESS', 'RESOLVED'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status value'
        });
      }

      const updated = await Feedback.updateStatus(id, status);

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: 'Feedback not found'
        });
      }

      const feedback = await Feedback.getById(id);

      res.json({
        success: true,
        message: 'Status updated successfully',
        feedback
      });
    } catch (error) {
      console.error('Error updating feedback status:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update feedback status'
      });
    }
  }
);

module.exports = router;