import React, { useState } from 'react';
import styled from 'styled-components';

const CreateForumModal = ({ onClose, onSubmit, categories, initialCategory }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(initialCategory); // Use the initial category

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, category });
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h2>Create New Forum in {initialCategory || 'New Category'}</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalForm onSubmit={handleSubmit}>
          <FormGroup>
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter forum title"
            />
          </FormGroup>
          <FormGroup>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Describe your forum topic..."
            />
          </FormGroup>
          <FormGroup>
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </FormGroup>
          <ButtonGroup>
            <CancelButton type="button" onClick={onClose}>Cancel</CancelButton>
            <SubmitButton type="submit">Create Forum</SubmitButton>
          </ButtonGroup>
        </ModalForm>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #1a2a6c;
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h2 {
    color: white;
    margin: 0;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  
  &:hover {
    color: #FFD700;
  }
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    color: white;
  }

  input, textarea, select {
    padding: 0.75rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 1rem;

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }

    &:focus {
      outline: none;
      border-color: #FFD700;
    }
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;

  &:hover {
    transform: translateY(-2px);
  }
`;

const SubmitButton = styled(Button)`
  background: #FFD700;
  color: #1a2a6c;
  border: none;

  &:hover {
    box-shadow: 0 2px 8px rgba(255, 215, 0, 0.4);
  }
`;

const CancelButton = styled(Button)`
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export default CreateForumModal;