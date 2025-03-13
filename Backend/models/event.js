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

  static async searchEvents(searchParams) {
    try {
      let query = `
        SELECT 
          id, title, description,
          DATE_FORMAT(event_date, '%Y-%m-%d') as event_date,
          TIME_FORMAT(start_time, '%H:%i') as start_time,
          TIME_FORMAT(end_time, '%H:%i') as end_time,
          location, event_type, isVirtual, isFree,
          registration_link, seats_available
        FROM events 
        WHERE is_active = 1
      `;
      
      const queryParams = [];

      if (searchParams.search) {
        query += ` AND (
          title LIKE ? OR 
          description LIKE ? OR 
          location LIKE ?
        )`;
        const searchTerm = `%${searchParams.search}%`;
        queryParams.push(searchTerm, searchTerm, searchTerm);
      }

      if (searchParams.type) {
        query += ` AND event_type = ?`;
        queryParams.push(searchParams.type);
      }

      query += ` ORDER BY event_date ASC, start_time ASC`;

      const [rows] = await db.query(query, queryParams);
      return rows;
    } catch (error) {
      throw new Error('Failed to search events: ' + error.message);
    }
  }

  static async getEventById(id) {
    try {
      const [rows] = await db.query(
        `SELECT 
          id, title, description,
          DATE_FORMAT(event_date, '%Y-%m-%d') as event_date,
          TIME_FORMAT(start_time, '%H:%i') as start_time,
          TIME_FORMAT(end_time, '%H:%i') as end_time,
          location, event_type, isVirtual, isFree,
          registration_link, seats_available
        FROM events 
        WHERE id = ? AND is_active = 1`,
        [id]
      );
      return rows[0];
    } catch (error) {
      throw new Error('Failed to fetch event: ' + error.message);
    }
  }

  static async createEvent(eventData) {
    try {
      const [result] = await db.query(
        `INSERT INTO events (
          title, description, event_date, start_time, end_time,
          location, event_type, isVirtual, isFree,
          registration_link, seats_available
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
          eventData.seats_available
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
      const [result] = await db.query(
        'UPDATE events SET is_active = 0 WHERE id = ?',
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error('Failed to delete event: ' + error.message);
    }
  }
}

module.exports = Event;