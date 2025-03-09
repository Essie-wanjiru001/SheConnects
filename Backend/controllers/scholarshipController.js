const Scholarship = require('../models/scholarship');
const fs = require('fs').promises;
const path = require('path');

exports.createScholarship = async (req, res) => {
    try {
        const scholarshipData = {
            name: req.body.name,
            description: req.body.description,
            eligibility: req.body.eligibility,
            application_deadline: req.body.application_deadline,
            apply_link: req.body.apply_link,
            type: req.body.type,
            image: req.file ? `/uploads/scholarships/${req.file.filename}` : null
        };

        const scholarshipId = await Scholarship.createScholarship(scholarshipData);
        res.status(201).json({
            success: true,
            message: 'Scholarship created successfully',
            scholarshipId
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getAllScholarships = async (req, res) => {
    try {
        const scholarships = await Scholarship.getAllScholarships();
        res.json({
            success: true,
            count: scholarships.length,
            scholarships
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.getScholarshipById = async (req, res) => {
    try {
        const scholarship = await Scholarship.getScholarshipById(req.params.id);
        if (!scholarship) {
            return res.status(404).json({ success: false, error: 'Scholarship not found' });
        }
        res.json({ success: true, scholarship });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.updateScholarship = async (req, res) => {
    try {
        const scholarshipData = {
            name: req.body.name,
            description: req.body.description,
            eligibility: req.body.eligibility,
            application_deadline: req.body.application_deadline,
            apply_link: req.body.apply_link,
            type: req.body.type // Add type field
        };

        if (req.file) {
            scholarshipData.image = `/uploads/scholarships/${req.file.filename}`;
        }

        const success = await Scholarship.updateScholarship(req.params.id, scholarshipData);
        if (!success) {
            return res.status(404).json({ success: false, error: 'Scholarship not found' });
        }
        res.json({ success: true, message: 'Scholarship updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.deleteScholarship = async (req, res) => {
    try {
        const result = await Scholarship.deleteScholarship(req.params.id);
        
        if (!result.success) {
            return res.status(404).json({
                success: false,
                error: 'Scholarship not found'
            });
        }

        if (result.imagePath) {
            const imagePath = path.join(__dirname, '..', result.imagePath);
            try {
                await fs.unlink(imagePath);
            } catch (error) {
                console.error('Error deleting image file:', error);
            }
        }

        res.json({
            success: true,
            message: 'Scholarship deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};