import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ManageTable from './ManageTable';
import { getScholarships, createScholarship, updateScholarship, deleteScholarship } from '../../services/adminService';

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'type', label: 'Type' },
    { 
      key: 'application_deadline', 
      label: 'Deadline',
      format: (value) => new Date(value).toLocaleDateString()
    }
  ];

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      const data = await getScholarships();
      setScholarships(data.scholarships);
    } catch (error) {
      console.error('Error fetching scholarships:', error);
    }
  };

  const handleEdit = (scholarship) => {
    setEditingItem(scholarship);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this scholarship?')) {
      try {
        await deleteScholarship(id);
        fetchScholarships();
      } catch (error) {
        console.error('Error deleting scholarship:', error);
      }
    }
  };

  return (
    <Container>
      <Header>
        <h2>Manage Scholarships</h2>
        <AddButton onClick={() => setShowForm(true)}>Add New Scholarship</AddButton>
      </Header>

      <ManageTable 
        items={scholarships}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <ScholarshipForm 
          scholarship={editingItem}
          onClose={() => {
            setShowForm(false);
            setEditingItem(null);
          }}
          onSubmit={async (data) => {
            try {
              if (editingItem) {
                await updateScholarship(editingItem.id, data);
              } else {
                await createScholarship(data);
              }
              fetchScholarships();
              setShowForm(false);
              setEditingItem(null);
            } catch (error) {
              console.error('Error saving scholarship:', error);
            }
          }}
        />
      )}
    </Container>
  );
};

export default ManageScholarships;