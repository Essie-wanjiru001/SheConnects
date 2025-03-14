import React from 'react';
import styled from 'styled-components';

const ManageTable = ({ items, columns, onEdit, onDelete }) => {
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
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 1rem;
  overflow-x: auto;
  margin-top: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: transparent;
  min-width: 800px;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
`;

const Td = styled.td`
  padding: 1rem;
  color: rgba(255, 255, 255, 0.9);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-start;
  align-items: center;
`;

const ActionButton = styled.button`
  background: rgba(41, 191, 159, 0.1);
  color: #ffffff;
  border: 1px solid rgba(41, 191, 159, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(41, 191, 159, 0.2);
    transform: translateY(-1px);
  }
`;

const DeleteButton = styled(ActionButton)`
  background: rgba(255, 76, 76, 0.1);
  border-color: rgba(255, 76, 76, 0.2);

  &:hover {
    background: rgba(255, 76, 76, 0.2);
  }
`;

export default ManageTable;