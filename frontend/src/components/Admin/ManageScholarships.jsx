import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../config/api';
import { getScholarships, createScholarship, updateScholarship, deleteScholarship } from '../../services/adminService';
import ScholarshipForm from './ScholarshipForm';
import ScholarshipStatsModal from './ScholarshipStatsModal';

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingScholarship, setEditingScholarship] = useState(null);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      setLoading(true);
      const data = await getScholarships();
      setScholarships(data || []);
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to load scholarships');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      setLoading(true);
      await createScholarship(formData);
      await fetchScholarships(); 
      setShowForm(false);
      alert('Scholarship created successfully');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create scholarship');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (scholarship) => {
    setEditingScholarship(scholarship);
    setShowForm(true);
  };

  const handleUpdate = async (formData) => {
    try {
      if (!editingScholarship?.scholarshipID) {
        throw new Error('Invalid scholarship ID');
      }
      
      await updateScholarship(editingScholarship.scholarshipID, formData);
      setShowForm(false);
      setEditingScholarship(null);
      await fetchScholarships();
      alert('Scholarship updated successfully');
    } catch (error) {
      console.error('Error updating scholarship:', error);
      setError(error.message || 'Failed to update scholarship');
    }
  };

  const handleDelete = async (id) => {
    if (!id || !window.confirm('Are you sure you want to delete this scholarship?')) {
      return;
    }

    try {
      setError(null);
      setLoading(true);
      
      await deleteScholarship(id);
      await fetchScholarships();
      
      // Show success message
      alert('Scholarship deleted successfully');
    } catch (error) {
      console.error('Error deleting scholarship:', error);
      setError(error.message || 'Failed to delete scholarship');
    } finally {
      setLoading(false);
    }
  };

  const fetchScholarshipApplications = async (scholarshipId) => {
    try {
      setError(null);
      const response = await api.get(`/api/admin/scholarships/${scholarshipId}/applications`);
      
      if (response.data.success) {
        setApplications(response.data.applications);
      } else {
        throw new Error(response.data.error || 'Failed to fetch applications');
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      setError('Failed to fetch scholarship applications. Please try again.');
      setApplications([]); // Reset applications on error
    }
  };

  const handleViewStats = async (scholarship) => {
    setSelectedScholarship(scholarship);
    await fetchScholarshipApplications(scholarship.scholarshipID);
    setShowStats(true);
  };

  if (loading) return <LoadingContainer>Loading scholarships...</LoadingContainer>;
  if (error) return <ErrorContainer>{error}</ErrorContainer>;

  return (
    <Container>
      <Header>
        <h2>Manage Scholarships</h2>
        <AddButton onClick={() => setShowForm(true)}>Add New Scholarship</AddButton>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Type</Th>
              <Th>Amount</Th>
              <Th>Deadline</Th>
              <Th>Location</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map(scholarship => (
              <tr key={scholarship.scholarshipID}>
                <Td>{scholarship.name}</Td>
                <Td>{scholarship.type}</Td>
                <Td>{scholarship.amount || 'Variable'}</Td>
                <Td>
                  {new Date(scholarship.application_deadline).toLocaleDateString()}
                </Td>
                <Td>{scholarship.location || 'Not specified'}</Td>
                <Td>
                  <ButtonGroup>
                    <ViewButton onClick={() => handleViewStats(scholarship)}>
                      View Stats
                    </ViewButton>
                    <ActionButton onClick={() => handleEdit(scholarship)}>
                      Edit
                    </ActionButton>
                    <DeleteButton onClick={() => handleDelete(scholarship.scholarshipID)}>
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
        <ScholarshipForm
          scholarship={editingScholarship}
          onClose={() => {
            setShowForm(false);
            setEditingScholarship(null);
          }}
          onSubmit={editingScholarship ? handleUpdate : handleCreate}
        />
      )}

      {showStats && selectedScholarship && (
        <ScholarshipStatsModal
          scholarship={selectedScholarship}
          applications={applications}
          onClose={() => setShowStats(false)}
        />
      )}
    </Container>
  );
};

// Styled Components
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

const ViewButton = styled(ActionButton)`
  background: #4caf50;
  
  &:hover {
    background: #388e3c;
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

const ErrorMessage = styled.div`
  color: #d32f2f;
  background: #ffebee;
  padding: 0.75rem;
  border-radius: 4px;
  margin: 1rem 0;
  font-size: 0.875rem;
`;

export default ManageScholarships;