const Feedback = require('../models/feedback');

exports.submitFeedback = async (req, res) => {
  try {
    const { category, title, description, priority } = req.body;
    const userId = req.user.id;
    let attachmentPath = null;

    if (req.file) {
      // Store the path relative to uploads directory
      attachmentPath = `uploads/feedback/${req.file.filename}`;
    }

    // Validate required fields
    if (!category || !title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const feedbackId = await Feedback.create(userId, {
      category,
      title,
      description,
      priority,
      attachmentPath
    });

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      feedbackId,
      attachmentUrl: attachmentPath ? `/${attachmentPath}` : null
    });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size too large. Maximum size is 5MB'
      });
    }
    
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'Unexpected field name for file upload'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to submit feedback'
    });
  }
};

exports.getUserFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.getByUserId(req.user.id);
    res.json({ success: true, feedbacks });
  } catch (error) {
    console.error('Error fetching user feedbacks:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feedbacks'
    });
  }
};

exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.getAll();
    res.json({ success: true, feedbacks });
  } catch (error) {
    console.error('Error fetching all feedbacks:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feedbacks'
    });
  }
};

exports.updateFeedbackStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const success = await Feedback.updateStatus(req.params.id, status);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    res.json({
      success: true,
      message: 'Feedback status updated successfully'
    });
  } catch (error) {
    console.error('Error updating feedback status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update feedback status'
    });
  }
};