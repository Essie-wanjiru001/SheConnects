const { pool } = require('../config/database');

class Event {
  static async getAllEvents() {
    try {
      console.log('Starting getAllEvents query...');
      const [rows] = await pool.query(`
        SELECT 
          id, title, description,
          DATE_FORMAT(event_date, '%Y-%m-%d') as event_date,
          TIME_FORMAT(start_time, '%H:%i') as start_time,
          TIME_FORMAT(end_time, '%H:%i') as end_time,
          location, event_type, isVirtual, isFree,
          registration_link, seats_available,
          created_at, updated_at
        FROM events 
        WHERE is_active = 1
        ORDER BY event_date ASC, start_time ASC
      `);
      console.log('Events found:', rows.length);
      return rows;
    } catch (error) {
      console.error('Database error in getAllEvents:', error);
      throw error;
    }
  }

  static async searchEvents(searchTerm) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM events WHERE (title LIKE ? OR description LIKE ?) AND is_active = 1',
        [`%${searchTerm}%`, `%${searchTerm}%`]
      );
      return rows || [];
    } catch (error) {
      throw new Error('Failed to search events');
    }
  }

  static async getEventById(id) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM events WHERE id = ? AND is_active = 1',
        [id]
      );
      return rows[0];
    } catch (error) {
      throw new Error('Failed to fetch event: ' + error.message);
    }
  }

  static async createEvent(eventData) {
    try {
      const [result] = await pool.query(
        `INSERT INTO events (
          title, description, event_date, start_time, end_time,
          location, event_type, isVirtual, isFree,
          registration_link, seats_available, is_active, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, NOW(), NOW())`,
        [
          eventData.title,
          eventData.description,
          eventData.event_date,
          eventData.start_time,
          eventData.end_time,
          eventData.location,
          eventData.event_type,
          eventData.isVirtual || false,
          eventData.isFree || true,
          eventData.registration_link,
          eventData.seats_available || null
        ]
      );
      return result.insertId;
    } catch (error) {
      throw new Error('Failed to create event: ' + error.message);
    }
  }

  static async updateEvent(id, eventData) {
    try {
      const [result] = await db.query(
        `UPDATE events 
         SET title = ?, description = ?, event_date = ?,
             start_time = ?, end_time = ?, location = ?,
             event_type = ?, isVirtual = ?, isFree = ?,
             registration_link = ?, seats_available = ?
         WHERE id = ? AND is_active = 1`,
        [
          eventData.title,
          eventData.description,
          eventData.event_date,
          eventData.start_time,
          eventData.end_time,
          eventData.location,
          eventData.event_type,
          eventData.isVirtual,
          eventData.isFree,
          eventData.registration_link,
          eventData.seats_available,
          id
        ]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error('Failed to update event: ' + error.message);
    }
  }

  static async deleteEvent(id) {
    try {
      const [events] = await pool.query(
        'SELECT * FROM events WHERE id = ? AND is_active = 1',
        [id]
      );
      
      if (events.length === 0) {
        return false;
      }

      const [result] = await pool.query(
        'UPDATE events SET is_active = 0 WHERE id = ?',
        [id]
      );

      return {
        success: result.affectedRows > 0,
        imagePath: events[0].image
      };
    } catch (error) {
      throw new Error('Failed to delete event');
    }
  }

  static async getTopThreeEvents() {
    try {
      const [rows] = await pool.query(`
        SELECT 
          id, title, description,
          DATE_FORMAT(event_date, '%Y-%m-%d') as event_date,
          TIME_FORMAT(start_time, '%H:%i') as start_time,
          TIME_FORMAT(end_time, '%H:%i') as end_time,
          location, event_type, isVirtual, isFree,
          registration_link
        FROM events 
        WHERE is_active = 1 
          AND event_date >= CURDATE()
        ORDER BY event_date ASC, start_time ASC
        LIMIT 3
      `);
      return rows;
    } catch (error) {
      console.error('Database error:', error);
      throw new Error('Failed to fetch events');
    }
  }

  static async getUpcomingEvents() {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM events WHERE event_date >= CURDATE() AND is_active = 1 ORDER BY event_date ASC',
      );
      return rows;
    } catch (error) {
      throw new Error('Failed to fetch upcoming events');
    }
  }
}

module.exports = Event;