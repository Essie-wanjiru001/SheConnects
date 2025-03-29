import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { StorageUtils } from '../../utils/storage';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsent = StorageUtils.getLocalStorage('cookieConsent');
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    StorageUtils.setLocalStorage('cookieConsent', { accepted: true, timestamp: new Date().toISOString() });
    setIsVisible(false);
  };

  const handleReject = () => {
    StorageUtils.setLocalStorage('cookieConsent', { accepted: false, timestamp: new Date().toISOString() });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <ConsentBanner>
      <ConsentContent>
        <ConsentText>
          We use cookies to enhance your experience on our platform. By continuing to use SheConnects, 
          you agree to our use of cookies as described in our Privacy Policy.
        </ConsentText>
        <ButtonGroup>
          <AcceptButton onClick={handleAccept}>Accept All Cookies</AcceptButton>
          <RejectButton onClick={handleReject}>Reject Non-Essential</RejectButton>
        </ButtonGroup>
      </ConsentContent>
    </ConsentBanner>
  );
};

const ConsentBanner = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 1rem;
  border-top: 1px solid #eee;
`;

const ConsentContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ConsentText = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
`;

const AcceptButton = styled(Button)`
  background-color: #4CAF50;
  color: white;
  &:hover {
    background-color: #45a049;
  }
`;

const RejectButton = styled(Button)`
  background-color: #f5f5f5;
  color: #666;
  &:hover {
    background-color: #e8e8e8;
  }
`;

export default CookieConsent;