const Internship = require('../models/internship');

exports.createInternship = async (req, res) => {
  try {
    const internshipId = await Internship.createInternship(req.body);
    res.status(201).json({
      success: true,
      message: 'Internship created successfully',
      internshipId
    });
  } catch (error) {
    console.error('Error creating internship:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create internship' 
    });
  }
};

exports.getAllInternships = async (req, res) => {
  try {
    const internships = await Internship.getAllInternships();
    res.json({ internships });
  } catch (error) {
    console.error('Error fetching internships:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch internships' 
    });
  }
};

exports.searchInternships = async (req, res) => {
  try {
    const searchParams = {
      search: req.query.search,
      type: req.query.type,
      duration: req.query.duration
    };
    const internships = await Internship.searchInternships(searchParams);
    res.json({ internships });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to search internships' 
    });
  }
};

exports.getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.getInternshipById(req.params.id);
    if (!internship) {
      return res.status(404).json({ 
        success: false, 
        error: 'Internship not found' 
      });
    }
    res.json({ internship });
  } catch (error) {
    console.error('Error fetching internship:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch internship' 
    });
  }
};

exports.updateInternship = async (req, res) => {
  try {
    const updated = await Internship.updateInternship(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ 
        success: false, 
        error: 'Internship not found' 
      });
    }
    res.json({ 
      success: true, 
      message: 'Internship updated successfully' 
    });
  } catch (error) {
    console.error('Error updating internship:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update internship' 
    });
  }
};

exports.deleteInternship = async (req, res) => {
  try {
    const deleted = await Internship.deleteInternship(req.params.id);
    if (!deleted) {
      return res.status(404).json({ 
        success: false, 
        error: 'Internship not found' 
      });
    }
    res.json({ 
      success: true, 
      message: 'Internship deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting internship:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to delete internship' 
    });
  }
};

exports.getMyApplications = async (req, res) => {
  try {
    const [applications] = await pool.query(
      'SELECT * FROM internship_applications WHERE user_id = ?',
      [req.user.userID]
    );
    res.json({ applications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createApplication = async (req, res) => {
  try {
    const { internshipId, status } = req.body;
    const [result] = await pool.query(
      'INSERT INTO internship_applications (user_id, internship_id, status) VALUES (?, ?, ?)',
      [req.user.userID, internshipId, status]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add these methods to handle application updates
exports.updateApplication = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    const userID = req.user.id;

    // Validate status
    const validStatuses = ['IN_PROGRESS', 'SUBMITTED', 'OFFER', 'NO_OFFER'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const [result] = await pool.query(
      'UPDATE internship_applications SET status = ?, updated_at = NOW() WHERE id = ? AND userID = ?',
      [status, applicationId, userID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Application not found or unauthorized'
      });
    }

    res.json({
      success: true,
      message: 'Application updated successfully'
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update application'
    });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM internship_applications WHERE id = ? AND userID = ?',
      [req.params.id, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Application not found or unauthorized'
      });
    }

    res.json({
      success: true,
      message: 'Application deleted successfully'
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete application'
    });
  }
};