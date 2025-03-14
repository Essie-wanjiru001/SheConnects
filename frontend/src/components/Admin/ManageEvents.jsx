import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ManageTable from './ManageTable';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../../services/adminService';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const columns = [
    { key: 'title', label: 'Title' },
    { 
      key: 'event_date', 
      label: 'Date',
      format: (value) => new Date(value).toLocaleDateString()
    },
    { key: 'location', label: 'Location' },
    { 
      key: 'isVirtual', 
      label: 'Virtual',
      format: (value) => value ? 'Yes' : 'No'
    },
    { 
      key: 'isFree', 
      label: 'Free',
      format: (value) => value ? 'Yes' : 'No'
    }
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleEdit = (event) => {
    setEditingItem(event);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id);
        fetchEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  return (
    <Container>
      <Header>
        <h2>Manage Events</h2>
        <AddButton onClick={() => setShowForm(true)}>Add New Event</AddButton>
      </Header>

      <ManageTable 
        items={events}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <EventForm 
          event={editingItem}
          onClose={() => {
            setShowForm(false);
            setEditingItem(null);
          }}
          onSubmit={async (data) => {
            try {
              if (editingItem) {
                await updateEvent(editingItem.id, data);
              } else {
                await createEvent(data);
              }
              fetchEvents();
              setShowForm(false);
              setEditingItem(null);
            } catch (error) {
              console.error('Error saving event:', error);
            }
          }}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  h2 {
    color: #ffffff;
    font-size: 1.8rem;
    margin: 0;
  }
`;

const AddButton = styled.button`
  background: rgba(41, 191, 159, 0.2);
  color: #ffffff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(41, 191, 159, 0.4);
    transform: translateY(-2px);
  }
`;

export default ManageEvents;