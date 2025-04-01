const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const auth = require('../middleware/auth');
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
  feedbackController.getAllFeedbacks
);

router.patch('/:id/status', 
  auth, 
  feedbackController.updateFeedbackStatus
);

module.exports = router;