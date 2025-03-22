const { pool } = require('../../config/database');

const dbUtils = {
  async cleanupDatabase() {
    try {
      await pool.execute('DELETE FROM users WHERE email IN (?, ?)', 
        ['admin@example.com', 'test@example.com']
      );
    } catch (error) {
      console.error('Database cleanup error:', error);
    }
  },

  async closeConnection() {
    try {
      await pool.end();
      console.log('Database connections closed');
    } catch (error) {
      console.error('Error closing database connection:', error);
    }
  }
};

module.exports = dbUtils;