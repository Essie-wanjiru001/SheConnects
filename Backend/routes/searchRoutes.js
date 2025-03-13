const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const { search, type, category } = req.query;
    let query = '';
    const queryParams = [];

    if (category === 'all' || !category) {
      // Search across all categories
      query = `
        (SELECT 'scholarship' as category, id, name, description, 
                application_deadline as date, type, eligibility as details
         FROM scholarships 
         WHERE is_active = 1
         ${search ? 'AND (name LIKE ? OR description LIKE ? OR eligibility LIKE ?)' : ''})
        UNION ALL
        (SELECT 'internship' as category, id, title as name, description,
                deadline as date, field as type, requirements as details
         FROM internships 
         WHERE is_active = 1
         ${search ? 'AND (title LIKE ? OR description LIKE ? OR requirements LIKE ?)' : ''})
        UNION ALL
        (SELECT 'event' as category, id, title as name, description,
                event_date as date, event_type as type, location as details
         FROM events 
         WHERE is_active = 1
         ${search ? 'AND (title LIKE ? OR description LIKE ? OR location LIKE ?)' : ''})
        ORDER BY date DESC
      `;

      if (search) {
        const searchTerm = `%${search}%`;
        queryParams.push(
          searchTerm, searchTerm, searchTerm,  // for scholarships
          searchTerm, searchTerm, searchTerm,  // for internships
          searchTerm, searchTerm, searchTerm   // for events
        );
      }
    } else {
      // Search specific category
      const tables = {
        scholarships: {
          fields: 'id, name, description, application_deadline as date, type, eligibility as details',
          conditions: 'name LIKE ? OR description LIKE ? OR eligibility LIKE ?'
        },
        internships: {
          fields: 'id, title as name, description, deadline as date, field as type, requirements as details',
          conditions: 'title LIKE ? OR description LIKE ? OR requirements LIKE ?'
        },
        events: {
          fields: 'id, title as name, description, event_date as date, event_type as type, location as details',
          conditions: 'title LIKE ? OR description LIKE ? OR location LIKE ?'
        }
      };

      const table = tables[category];
      query = `
        SELECT '${category}' as category, ${table.fields}
        FROM ${category}
        WHERE is_active = 1
        ${search ? `AND (${table.conditions})` : ''}
        ${type ? 'AND type = ?' : ''}
        ORDER BY date DESC
      `;

      if (search) {
        const searchTerm = `%${search}%`;
        queryParams.push(searchTerm, searchTerm, searchTerm);
      }
      if (type) {
        queryParams.push(type);
      }
    }

    const [results] = await pool.query(query, queryParams);
    res.json({ results });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ 
      error: 'Search failed',
      details: error.message 
    });
  }
});

module.exports = router;