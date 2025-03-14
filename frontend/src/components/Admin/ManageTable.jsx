import React from 'react';
import styled from 'styled-components';

const ManageTable = ({ items = [], columns = [], onEdit, onDelete }) => {
  if (!Array.isArray(items)) {
    return <ErrorMessage>Error loading data</ErrorMessage>;
  }

  return (
    <TableWrapper>
      <Table>
        <thead>
          <tr>
            {columns.map(column => (
              <Th key={column.key}>{column.label}</Th>
            ))}
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              {columns.map(column => (
                <Td key={`${item.id}-${column.key}`}>
                  {column.format ? column.format(item[column.key]) : item[column.key]}
                </Td>
              ))}
              <Td>
                <ButtonGroup>
                  <ActionButton onClick={() => onEdit(item)}>Edit</ActionButton>
                  <DeleteButton onClick={() => onDelete(item.id)}>Delete</DeleteButton>
                </ButtonGroup>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
};

const TableWrapper = styled.div`
  background: rgba(255, 255, 255, 0.9); 
  border-radius: 10px;
  padding: 1.5rem;
  overflow-x: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  color: #1a2a6c; // Dark blue for headers
  font-size: 1rem;
  font-weight: 600;
  border-bottom: 2px solid rgba(26, 42, 108, 0.2);
`;

const Td = styled.td`
  padding: 1rem;
  color: #333333; // Darker text for better readability
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: #29bf9f; // Solid teal color
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #248c76;
    transform: translateY(-1px);
  }
`;

const DeleteButton = styled(ActionButton)`
  background: #dc3545; // Solid red color

  &:hover {
    background: #bd2130;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  text-align: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  margin-top: 1rem;
`;

export default ManageTable;