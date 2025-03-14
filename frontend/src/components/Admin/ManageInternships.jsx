import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import InternshipForm from './InternshipForm';
import { getInternships, createInternship, updateInternship, deleteInternship } from '../../services/adminService';

const ManageInternships = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingInternship, setEditingInternship] = useState(null);

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      setLoading(true);
      const data = await getInternships();
      setInternships(data || []);
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to load internships');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      setLoading(true);
      await createInternship(formData);
      await fetchInternships(); 
      setShowForm(false);
      alert('Internship created successfully');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create internship');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (internship) => {
    setEditingInternship(internship);
    setShowForm(true);
  };

  const handleUpdate = async (formData) => {
    try {
      await updateInternship(editingInternship.id, formData);
      setShowForm(false);
      setEditingInternship(null);
      await fetchInternships();
    } catch (error) {
      console.error('Error updating internship:', error);
      setError('Failed to update internship');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this internship?')) {
      return;
    }

    try {
      await deleteInternship(id);
      await fetchInternships();
    } catch (error) {
      console.error('Error deleting internship:', error);
      setError('Failed to delete internship');
    }
  };

  if (loading) return <LoadingContainer>Loading internships...</LoadingContainer>;
  if (error) return <ErrorContainer>{error}</ErrorContainer>;

  return (
    <Container>
      <Header>
        <h2>Manage Internships</h2>
        <AddButton onClick={() => setShowForm(true)}>Add New Internship</AddButton>
      </Header>

      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>Title</Th>
              <Th>Company</Th>
              <Th>Location</Th>
              <Th>Type</Th>
              <Th>Deadline</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {internships.map(internship => (
              <tr key={internship.id}>
                <Td>{internship.title}</Td>
                <Td>{internship.company}</Td>
                <Td>{internship.location}</Td>
                <Td>{internship.type}</Td>
                <Td>{new Date(internship.deadline).toLocaleDateString()}</Td>
                <Td>
                  <ButtonGroup>
                    <ActionButton onClick={() => handleEdit(internship)}>
                      Edit
                    </ActionButton>
                    <DeleteButton onClick={() => handleDelete(internship.id)}>
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
        <InternshipForm
          internship={editingInternship}
          onClose={() => {
            setShowForm(false);
            setEditingInternship(null);
          }}
          onSubmit={editingInternship ? handleUpdate : handleCreate}
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

export default ManageInternships;