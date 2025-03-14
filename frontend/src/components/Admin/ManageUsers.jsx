import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getUsers } from '../../services/adminService';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getUsers();
        setUsers(data || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users');
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <LoadingContainer>Loading users...</LoadingContainer>;
  if (error) return <ErrorContainer>{error}</ErrorContainer>;

  return (
    <Container>
      <Header>
        <h2>Manage Users</h2>
      </Header>

      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {users && users.map(user => (
              <tr key={user.id}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.is_admin ? 'Admin' : 'User'}</Td>
                <Td>
                  <ButtonGroup>
                    <ActionButton>Edit</ActionButton>
                    <DeleteButton>Delete</DeleteButton>
                  </ButtonGroup>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
  background: #1a2a6c;
  min-height: 100vh;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  h2 {
    color: #ffffff;
    font-size: 1.8rem;
  }
`;

const TableWrapper = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 1.5rem;
  overflow-x: auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  color: #29bf9f;
  font-size: 1rem;
  font-weight: 600;
  border-bottom: 2px solid rgba(41, 191, 159, 0.3);
`;

const Td = styled.td`
  padding: 1rem;
  color: #ffffff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: rgba(41, 191, 159, 0.2);
  color: #ffffff;
  border: 1px solid rgba(41, 191, 159, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(41, 191, 159, 0.3);
  }
`;

const DeleteButton = styled(ActionButton)`
  background: rgba(255, 76, 76, 0.2);
  border-color: rgba(255, 76, 76, 0.3);

  &:hover {
    background: rgba(255, 76, 76, 0.3);
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: #ffffff;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: #ff6b6b;
  background: rgba(255, 0, 0, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(255, 0, 0, 0.2);
`;

export default ManageUsers;