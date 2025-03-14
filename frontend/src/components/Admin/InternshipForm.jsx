import React, { useState } from 'react';
import styled from 'styled-components';

const InternshipForm = ({ internship, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: internship?.title || '',
    company: internship?.company || '',
    description: internship?.description || '',
    location: internship?.location || '',
    deadline: internship?.deadline?.split('T')[0] || '',
    type: internship?.type || 'Full-time',
    duration: internship?.duration || '',
    isPaid: internship?.isPaid || false,
    apply_link: internship?.apply_link || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <FormOverlay>
      <FormContainer>
        <FormHeader>
          <h2>{internship ? 'Edit Internship' : 'Add New Internship'}</h2>
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
            <Label>Company</Label>
            <Input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
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
            <Label>Location</Label>
            <Input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </FormGroup>

          <FormGroup>
            <Label>Deadline</Label>
            <Input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({...formData, deadline: e.target.value})}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Type</Label>
            <Select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Remote">Remote</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Duration</Label>
            <Input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
              placeholder="e.g. 3 months"
            />
          </FormGroup>

          <FormGroup>
            <Label>Is Paid</Label>
            <Checkbox
              type="checkbox"
              checked={formData.isPaid}
              onChange={(e) => setFormData({...formData, isPaid: e.target.checked})}
            />
          </FormGroup>

          <FormGroup>
            <Label>Apply Link</Label>
            <Input
              type="url"
              value={formData.apply_link}
              onChange={(e) => setFormData({...formData, apply_link: e.target.value})}
              required
            />
          </FormGroup>

          <ButtonGroup>
            <SubmitButton type="submit">
              {internship ? 'Update' : 'Create'} Internship
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

export default InternshipForm;