import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ManageTable from './ManageTable';
import { getInternships, createInternship, updateInternship, deleteInternship } from '../../services/adminService';

const ManageInternships = () => {
  const [internships, setInternships] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'company', label: 'Company' },
    { key: 'location', label: 'Location' },
    { 
      key: 'deadline', 
      label: 'Deadline',
      format: (value) => new Date(value).toLocaleDateString()
    },
    { 
      key: 'isPaid', 
      label: 'Paid',
      format: (value) => value ? 'Yes' : 'No'
    }
  ];

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      const data = await getInternships();
      setInternships(data);
    } catch (error) {
      console.error('Error fetching internships:', error);
    }
  };

  const handleEdit = (internship) => {
    setEditingItem(internship);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this internship?')) {
      try {
        await deleteInternship(id);
        fetchInternships();
      } catch (error) {
        console.error('Error deleting internship:', error);
      }
    }
  };

  return (
    <Container>
      <Header>
        <h2>Manage Internships</h2>
        <AddButton onClick={() => setShowForm(true)}>Add New Internship</AddButton>
      </Header>

      <ManageTable 
        items={internships}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <InternshipForm 
          internship={editingItem}
          onClose={() => {
            setShowForm(false);
            setEditingItem(null);
          }}
          onSubmit={async (data) => {
            try {
              if (editingItem) {
                await updateInternship(editingItem.id, data);
              } else {
                await createInternship(data);
              }
              fetchInternships();
              setShowForm(false);
              setEditingItem(null);
            } catch (error) {
              console.error('Error saving internship:', error);
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

export default ManageInternships;