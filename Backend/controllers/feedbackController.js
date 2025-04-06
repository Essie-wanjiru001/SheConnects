const Feedback = require('../models/feedback');

exports.submitFeedback = async (req, res) => {
  try {
    const { category, title, description, priority } = req.body;
    const userId = req.user.id;
    let attachmentPath = null;

    // Validate category
    const validCategories = ['bug', 'feature', 'improvement', 'other'];
    if (!validCategories.includes(category.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category'
      });
    }

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
    res.status(500).json({
      success: false,
      message: 'Failed to submit feedback'
    });
  }
};

exports.getUserFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.getByUserId(req.user.id);
    res.json({
      success: true,
      feedbacks
    });
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
    res.json({
      success: true,
      feedbacks
    });
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
};