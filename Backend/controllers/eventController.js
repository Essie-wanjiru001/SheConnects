const Event = require('../models/event');

exports.createEvent = async (req, res) => {
  try {
    const eventId = await Event.createEvent(req.body);
    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      eventId
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create event' 
    });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.getAllEvents();
    res.json({ events });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch events' 
    });
  }
};

exports.searchEvents = async (req, res) => {
  try {
    const searchParams = {
      search: req.query.search,
      type: req.query.type
    };
    const events = await Event.searchEvents(searchParams);
    res.json({ events });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to search events' 
    });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.getEventById(req.params.id);
    if (!event) {
      return res.status(404).json({ 
        success: false, 
        error: 'Event not found' 
      });
    }
    res.json({ event });
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch event' 
    });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const updated = await Event.updateEvent(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ 
        success: false, 
        error: 'Event not found' 
      });
    }
    res.json({ 
      success: true, 
      message: 'Event updated successfully' 
    });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update event' 
    });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const deleted = await Event.deleteEvent(req.params.id);
    if (!deleted) {
      return res.status(404).json({ 
        success: false, 
        error: 'Event not found' 
      });
    }
    res.json({ 
      success: true, 
      message: 'Event deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to delete event' 
    });
  }
};