const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const adminAuth = require('../middleware/adminAuth');
const auth = require('../middleware/auth');

// Public routes
router.get('/', eventController.getAllEvents);
router.get('/search', eventController.searchEvents);
router.get('/:id', eventController.getEventById);

// Admin only routes
router.post('/', adminAuth, eventController.createEvent);
router.put('/:id', adminAuth, eventController.updateEvent);
router.delete('/:id', adminAuth, eventController.deleteEvent);

// User routes
router.post('/:id/attendance', auth, eventController.updateAttendance);
router.post('/:id/feedback', auth, eventController.submitFeedback);

module.exports = router;