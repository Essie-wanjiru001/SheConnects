import styled from 'styled-components';

export const CommonWrapper = styled.div`
  background: linear-gradient(135deg, #9ad0c2 0%, #0d9276 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow-y: auto;
  border: 1px solid #000;
`;

export const CommonHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 5px 20px;
  height: 70px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #9ad0c2 0%, #0d9276 100%);
  z-index: 1000;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(
      to right,
      transparent,
      rgba(13, 146, 118, 0.5),
      transparent
    );
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1440px;
  width: 100%;
  margin: 90px auto 0; // Added top margin to account for fixed header
  padding: 20px;
  gap: 20px;
`;