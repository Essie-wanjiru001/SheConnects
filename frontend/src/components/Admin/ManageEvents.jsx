import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import EventForm from './EventForm';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../../services/adminService';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await getEvents();
      setEvents(data || []);
      setError(null);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      await deleteEvent(id);
      await fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      setError('Failed to delete event');
    }
  };

  const handleCreate = async (formData) => {
    try {
      setLoading(true);
      await createEvent(formData);
      await fetchEvents(); 
      setShowForm(false);
      alert('Event created successfully');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingContainer>Loading events...</LoadingContainer>;
  if (error) return <ErrorContainer>{error}</ErrorContainer>;

  return (
    <Container>
      <Header>
        <h2>Manage Events</h2>
        <AddButton onClick={() => setShowForm(true)}>Add New Event</AddButton>
      </Header>

      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>Title</Th>
              <Th>Date</Th>
              <Th>Time</Th>
              <Th>Location</Th>
              <Th>Type</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id}>
                <Td>{event.title}</Td>
                <Td>{new Date(event.event_date).toLocaleDateString()}</Td>
                <Td>{`${event.start_time} - ${event.end_time}`}</Td>
                <Td>{event.location}</Td>
                <Td>{event.event_type}</Td>
                <Td>
                  <ButtonGroup>
                    <ActionButton onClick={() => handleEdit(event)}>
                      Edit
                    </ActionButton>
                    <DeleteButton onClick={() => handleDelete(event.id)}>
                      Delete
                    </DeleteButton>
                  </ButtonGroup>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>

      {showForm && (
        <EventForm
          event={editingEvent}
          onClose={() => {
            setShowForm(false);
            setEditingEvent(null);
          }}
          onSubmit={async (formData) => {
            try {
              if (editingEvent) {
                await updateEvent(editingEvent.id, formData);
              } else {
                await createEvent(formData);
              }
              await fetchEvents();
              setShowForm(false);
              setEditingEvent(null);
            } catch (error) {
              console.error('Error saving event:', error);
              setError('Failed to save event');
            }
          }}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
  background: #f5f5f5;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  h2 {
    color: #1a2a6c;
    font-size: 1.8rem;
    font-weight: 600;
  }
`;

const TableWrapper = styled.div`
  background: #ffffff;
  border-radius: 10px;
  padding: 1.5rem;
  overflow-x: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  background: #1a2a6c;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  border-bottom: 2px solid #29bf9f;
`;

const Td = styled.td`
  padding: 1rem;
  color: #333333;
  border-bottom: 1px solid #e0e0e0;
  background: #ffffff;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const AddButton = styled.button`
  background: #29bf9f;
  color: #ffffff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #248c76;
    transform: translateY(-2px);
  }
`;

const ActionButton = styled.button`
  background: #1a2a6c;
  color: #ffffff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #29bf9f;
  }
`;

const DeleteButton = styled(ActionButton)`
  background: #dc3545;

  &:hover {
    background: #c82333;
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: #1a2a6c;
  font-size: 1.1rem;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: #dc3545;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dc3545;
  margin: 1rem;
`;

export default ManageEvents;