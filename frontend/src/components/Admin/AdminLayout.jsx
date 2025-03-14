import React from 'react';
import styled from 'styled-components';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => {
  return (
    <LayoutContainer>
      <AdminSidebar />
      <MainContent>
        {children}
      </MainContent>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f5f5f5;
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 250px;
  padding: 2rem;
  background: #f5f5f5;
  min-height: 100vh;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`;

export default AdminLayout;