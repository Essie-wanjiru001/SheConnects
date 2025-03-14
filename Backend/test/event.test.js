const { pool } = require('../config/database');
const Event = require('../models/event');

// Mock the database pool
jest.mock('../config/database', () => ({
  pool: {
    query: jest.fn()
  }
}));

describe('Event Model Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createEvent', () => {
    const mockEventData = {
      title: 'Tech Conference 2025',
      description: 'Annual women in tech conference',
      event_date: '2025-06-15',
      start_time: '09:00:00',
      end_time: '17:00:00',
      location: 'Virtual',
      event_type: 'Conference',
      isVirtual: true,
      isFree: true,
      registration_link: 'https://example.com/register',
      seats_available: 100
    };

    test('should create an event successfully', async () => {
      const mockInsertId = 1;
      pool.query.mockResolvedValueOnce([{ insertId: mockInsertId }]);

      const result = await Event.createEvent(mockEventData);

      expect(result).toBe(mockInsertId);
      expect(pool.query).toHaveBeenCalledTimes(1);
      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO events'),
        expect.arrayContaining([
          mockEventData.title,
          mockEventData.description,
          mockEventData.event_date
        ])
      );
    });

    test('should throw error when creation fails', async () => {
      pool.query.mockRejectedValueOnce(new Error('Database error'));

      await expect(Event.createEvent(mockEventData))
        .rejects
        .toThrow('Failed to create event');
    });
  });

  describe('getEventById', () => {
    test('should return event when found', async () => {
      const mockEvent = {
        id: 1,
        title: 'Tech Conference 2025',
        description: 'Annual women in tech conference'
      };
      pool.query.mockResolvedValueOnce([[mockEvent]]);

      const result = await Event.getEventById(1);

      expect(result).toEqual(mockEvent);
      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining('SELECT * FROM events WHERE id = ?'),
        [1]
      );
    });

    test('should return undefined when event not found', async () => {
      pool.query.mockResolvedValueOnce([[]]);

      const result = await Event.getEventById(999);

      expect(result).toBeUndefined();
    });
  });

  describe('getUpcomingEvents', () => {
    test('should return upcoming events', async () => {
      const mockEvents = [
        { id: 1, title: 'Event 1', event_date: '2025-12-01' },
        { id: 2, title: 'Event 2', event_date: '2025-12-15' }
      ];
      pool.query.mockResolvedValueOnce([mockEvents]);

      const result = await Event.getUpcomingEvents();

      expect(result).toEqual(mockEvents);
      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining('WHERE event_date >= CURDATE()') // Changed from 'date' to 'event_date'
      );
    });

    test('should return empty array when no upcoming events', async () => {
      pool.query.mockResolvedValueOnce([[]]);

      const result = await Event.getUpcomingEvents();

      expect(result).toEqual([]);
    });
  });

  describe('deleteEvent', () => {
    test('should soft delete event successfully', async () => {
      pool.query.mockResolvedValueOnce([[{ id: 1, image: '/event-image.jpg' }]]);
      pool.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

      const result = await Event.deleteEvent(1);

      expect(result).toEqual({
        success: true,
        imagePath: '/event-image.jpg'
      });
      expect(pool.query).toHaveBeenCalledTimes(2);
    });

    test('should return false when event not found', async () => {
      pool.query.mockResolvedValueOnce([[]]);

      const result = await Event.deleteEvent(999);

      expect(result).toBe(false);
    });
  });

  describe('searchEvents', () => {
    test('should return matching events', async () => {
      const searchTerm = 'tech';
      const mockEvents = [
        { id: 1, title: 'Tech Conference' },
        { id: 2, title: 'Women in Tech Meetup' }
      ];
      pool.query.mockResolvedValueOnce([mockEvents]);

      const result = await Event.searchEvents(searchTerm);

      expect(result).toEqual(mockEvents);
      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining('LIKE ?'),
        ['%tech%', '%tech%']
      );
    });

    test('should return empty array when no matches found', async () => {
      pool.query.mockResolvedValueOnce([[]]);

      const result = await Event.searchEvents('nonexistent');

      expect(result).toEqual([]);
    });
  });
});