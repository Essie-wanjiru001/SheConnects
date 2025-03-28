const { pool } = require('../config/database');

const searchItems = async (req, res) => {
    try {
        const { query, category } = req.query;
        let sqlQuery = '';
        let params = [];

        if (category && category !== 'all') {
            // Category-specific search
            switch (category) {
                case 'scholarships':
                    sqlQuery = `
                        SELECT id, name as title, description, application_deadline as deadline, 
                               'scholarship' as type 
                        FROM scholarships 
                        WHERE is_active = 1 
                        AND (name LIKE ? OR description LIKE ?)
                    `;
                    break;
                case 'internships':
                    sqlQuery = `
                        SELECT id, title, description, deadline, company, location,
                               'internship' as type 
                        FROM internships 
                        WHERE is_active = 1 
                        AND (title LIKE ? OR company LIKE ? OR description LIKE ?)
                    `;
                    break;
                case 'events':
                    sqlQuery = `
                        SELECT id, title, description, event_date as date,
                               'event' as type 
                        FROM events 
                        WHERE is_active = 1 
                        AND (title LIKE ? OR description LIKE ?)
                    `;
                    break;
            }
            params = category === 'internships' 
                ? [`%${query}%`, `%${query}%`, `%${query}%`] 
                : [`%${query}%`, `%${query}%`];
        } else {
            // Search across all categories
            sqlQuery = `
                (SELECT id, name as title, description, application_deadline as deadline,
                        'scholarship' as type 
                 FROM scholarships 
                 WHERE is_active = 1 
                 AND (name LIKE ? OR description LIKE ?))
                UNION ALL
                (SELECT id, title, description, deadline,
                        'internship' as type 
                 FROM internships 
                 WHERE is_active = 1 
                 AND (title LIKE ? OR company LIKE ? OR description LIKE ?))
                UNION ALL
                (SELECT id, title, description, event_date as date,
                        'event' as type 
                 FROM events 
                 WHERE is_active = 1 
                 AND (title LIKE ? OR description LIKE ?))
            `;
            params = [
                `%${query}%`, `%${query}%`,                    // scholarships
                `%${query}%`, `%${query}%`, `%${query}%`,     // internships
                `%${query}%`, `%${query}%`                     // events
            ];
        }

        const [results] = await pool.query(sqlQuery, params);
        res.json({ success: true, results });

    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to perform search',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = { searchItems };