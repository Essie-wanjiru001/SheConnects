const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const auth = require('../middleware/auth');

// Get user's dashboard data
router.get('/summary', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    // Get in-progress scholarship applications
    const [scholarshipApps] = await pool.query(`
      SELECT 
        sa.*,
        s.name as scholarship_name,
        s.application_deadline as deadline
      FROM scholarship_applications sa
      JOIN scholarships s ON sa.scholarshipID = s.scholarshipID
      WHERE sa.userID = ? AND sa.status = 'IN_PROGRESS'
      ORDER BY s.application_deadline ASC
    `, [userId]);

    // Get in-progress internship applications
    const [internshipApps] = await pool.query(`
      SELECT 
        ia.*,
        i.title as internship_name,
        i.company,
        i.deadline
      FROM internship_applications ia
      JOIN internships i ON ia.internship_id = i.id
      WHERE ia.userID = ? AND ia.status = 'IN_PROGRESS'
      ORDER BY i.deadline ASC
    `, [userId]);

    // Get upcoming events
    const [events] = await pool.query(`
      SELECT *
      FROM events
      WHERE date >= CURDATE()
      AND is_active = 1
      ORDER BY date ASC
      LIMIT 5
    `);

    // Get upcoming deadlines (combining scholarships and internships)
    const [upcomingDeadlines] = await pool.query(`
      (SELECT 
        'scholarship' as type,
        scholarshipID as id,
        name as title,
        application_deadline as deadline
      FROM scholarships
      WHERE application_deadline >= CURDATE()
      AND is_active = 1)
      UNION
      (SELECT 
        'internship' as type,
        id,
        title,
        deadline
      FROM internships
      WHERE deadline >= CURDATE()
      AND is_active = 1)
      ORDER BY deadline ASC
      LIMIT 5
    `);

    res.json({
      success: true,
      data: {
        scholarshipApplications: scholarshipApps,
        internshipApplications: internshipApps,
        upcomingEvents: events,
        upcomingDeadlines
      }
    });

  } catch (error) {
    console.error('Dashboard data error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard data'
    });
  }
});

module.exports = router;