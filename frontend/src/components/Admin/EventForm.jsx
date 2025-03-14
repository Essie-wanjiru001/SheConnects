import React, { useState } from 'react';
import styled from 'styled-components';

const EventForm = ({ event, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    event_date: event?.event_date?.split('T')[0] || '',
    start_time: event?.start_time || '',
    end_time: event?.end_time || '',
    location: event?.location || '',
    event_type: event?.event_type || 'Workshop',
    isVirtual: event?.isVirtual || false,
    isFree: event?.isFree || true,
    registration_link: event?.registration_link || '',
    seats_available: event?.seats_available || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <FormOverlay>
      <FormContainer>
        <FormHeader>
          <h2>{event ? 'Edit Event' : 'Add New Event'}</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </FormHeader>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Title</Label>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Date</Label>
            <Input
              type="date"
              value={formData.event_date}
              onChange={(e) => setFormData({...formData, event_date: e.target.value})}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Start Time</Label>
            <Input
              type="time"
              value={formData.start_time}
              onChange={(e) => setFormData({...formData, start_time: e.target.value})}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>End Time</Label>
            <Input
              type="time"
              value={formData.end_time}
              onChange={(e) => setFormData({...formData, end_time: e.target.value})}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Location</Label>
            <Input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Event Type</Label>
            <Select
              value={formData.event_type}
              onChange={(e) => setFormData({...formData, event_type: e.target.value})}
            >
              <option value="Workshop">Workshop</option>
              <option value="Conference">Conference</option>
              <option value="Webinar">Webinar</option>
              <option value="Networking">Networking</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Virtual Event</Label>
            <Checkbox
              type="checkbox"
              checked={formData.isVirtual}
              onChange={(e) => setFormData({...formData, isVirtual: e.target.checked})}
            />
          </FormGroup>

          <FormGroup>
            <Label>Free Event</Label>
            <Checkbox
              type="checkbox"
              checked={formData.isFree}
              onChange={(e) => setFormData({...formData, isFree: e.target.checked})}
            />
          </FormGroup>

          <FormGroup>
            <Label>Registration Link</Label>
            <Input
              type="url"
              value={formData.registration_link}
              onChange={(e) => setFormData({...formData, registration_link: e.target.value})}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Available Seats</Label>
            <Input
              type="number"
              value={formData.seats_available}
              onChange={(e) => setFormData({...formData, seats_available: e.target.value})}
              min="0"
            />
          </FormGroup>

          <ButtonGroup>
            <SubmitButton type="submit">
              {event ? 'Update' : 'Create'} Event
            </SubmitButton>
            <CancelButton type="button" onClick={onClose}>
              Cancel
            </CancelButton>
          </ButtonGroup>
        </Form>
      </FormContainer>
    </FormOverlay>
  );
};

const FormOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const FormContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h2 {
    margin: 0;
    color: #1a2a6c;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #1a2a6c;
  }
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #1a2a6c;
  }
`;

const Textarea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #1a2a6c;
  }
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const SubmitButton = styled(Button)`
  background: #1a2a6c;
  color: white;

  &:hover {
    background: #29bf9f;
  }
`;

const CancelButton = styled(Button)`
  background: #dc3545;
  color: white;

  &:hover {
    background: #c82333;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  padding: 0.5rem;

  &:hover {
    color: #dc3545;
  }
`;

export default EventForm;