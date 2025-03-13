const express = require('express');
const router = express.Router();
const internshipController = require('../controllers/internshipController');
const adminAuth = require('../middleware/adminAuth');

// Public routes
router.get('/', internshipController.getAllInternships);
router.get('/search', internshipController.searchInternships);
router.get('/:id', internshipController.getInternshipById);

// Admin only routes
router.post('/', adminAuth, internshipController.createInternship);
router.put('/:id', adminAuth, internshipController.updateInternship);
router.delete('/:id', adminAuth, internshipController.deleteInternship);

module.exports = router;