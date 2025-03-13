import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getUsers, updateUser, deleteUser } from '../../services/adminService';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data.users);
      setError(null);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser({ ...user });
  };

  const handleUpdate = async () => {
    try {
      await updateUser(editingUser.userID, editingUser);
      setUsers(users.map(user => 
        user.userID === editingUser.userID ? editingUser : user
      ));
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Failed to update user');
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        setUsers(users.filter(user => user.userID !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
        setError('Failed to delete user');
      }
    }
  };

  if (loading) return <Loading>Loading users...</Loading>;
  if (error) return <Error>{error}</Error>;

  return (
    <Container>
      <Header>
        <h1>Manage Users</h1>
      </Header>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Gender</Th>
              <Th>Admin</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.userID}>
                {editingUser?.userID === user.userID ? (
                  <>
                    <Td>
                      <Input
                        type="text"
                        value={editingUser.name}
                        onChange={(e) => setEditingUser({
                          ...editingUser,
                          name: e.target.value
                        })}
                      />
                    </Td>
                    <Td>
                      <Input
                        type="email"
                        value={editingUser.email}
                        onChange={(e) => setEditingUser({
                          ...editingUser,
                          email: e.target.value
                        })}
                      />
                    </Td>
                    <Td>
                      <Select
                        value={editingUser.gender || ''}
                        onChange={(e) => setEditingUser({
                          ...editingUser,
                          gender: e.target.value
                        })}
                      >
                        <option value="">Select gender</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="other">Other</option>
                      </Select>
                    </Td>
                    <Td>
                      <Checkbox
                        type="checkbox"
                        checked={editingUser.is_admin}
                        onChange={(e) => setEditingUser({
                          ...editingUser,
                          is_admin: e.target.checked
                        })}
                      />
                    </Td>
                    <Td>
                      <ActionButton onClick={handleUpdate}>Save</ActionButton>
                      <ActionButton onClick={() => setEditingUser(null)}>Cancel</ActionButton>
                    </Td>
                  </>
                ) : (
                  <>
                    <Td>{user.name}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.gender || 'Not specified'}</Td>
                    <Td>{user.is_admin ? 'Yes' : 'No'}</Td>
                    <Td>
                      <ActionButton onClick={() => handleEdit(user)}>Edit</ActionButton>
                      <DeleteButton onClick={() => handleDelete(user.userID)}>Delete</DeleteButton>
                    </Td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  min-height: 100vh;
`;

const Header = styled.header`
  margin-bottom: 2rem;
  h1 {
    color: #ffffff;
    font-size: 2rem;
  }
`;

const TableContainer = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 1rem;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: transparent;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  color: #ffffff;
  font-weight: 600;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
`;

const Td = styled.td`
  padding: 1rem;
  color: #ffffff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 0.5rem;
  color: #ffffff;
  width: 100%;
`;

const Select = styled.select`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 0.5rem;
  color: #ffffff;
  width: 100%;
  
  option {
    background: #2c3e50;
    color: #ffffff;
  }
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
`;

const ActionButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 0.5rem;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const DeleteButton = styled(ActionButton)`
  background: rgba(255, 0, 0, 0.2);
  
  &:hover {
    background: rgba(255, 0, 0, 0.3);
  }
`;

const Loading = styled.div`
  text-align: center;
  padding: 2rem;
  color: #ffffff;
`;

const Error = styled.div`
  text-align: center;
  padding: 2rem;
  color: #ff4444;
`;

export default ManageUsers;