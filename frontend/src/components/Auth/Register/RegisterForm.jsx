import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { register } from '../../../services/authService';
import PrivacyPolicy from '../../Privacy/PrivacyPolicy';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptedPrivacyPolicy: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Form validation
      if (!formData.name.trim()) {
        throw new Error('Name is required');
      }

      if (!formData.email.trim()) {
        throw new Error('Email is required');
      }

      if (!formData.password) {
        throw new Error('Password is required');
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (!formData.acceptedPrivacyPolicy) {
        throw new Error('You must accept the Privacy Policy to register');
      }

      const response = await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        acceptedPrivacyPolicy: formData.acceptedPrivacyPolicy
      });

      if (response.success) {
        navigate('/login', { 
          state: { message: 'Registration successful! Please login.' }
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handleAcceptPrivacyPolicy = () => {
    setFormData({
      ...formData,
      acceptedPrivacyPolicy: true
    });
    setShowPrivacyPolicy(false);
  };

  return (
    <FormContainer>
      <Title>Create Account</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={handleSubmit}>
        <FormField>
          <Input
            type="text"
            id="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </FormField>

        <FormField>
          <Input
            type="email"
            id="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </FormField>

        <FormField>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </FormField>

        <FormField>
          <Input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </FormField>
        
        <PrivacySection>
          <CheckboxContainer>
            <Checkbox
              type="checkbox"
              id="privacyPolicy"
              checked={formData.acceptedPrivacyPolicy}
              onChange={(e) => setFormData({
                ...formData,
                acceptedPrivacyPolicy: e.target.checked
              })}
            />
            <CheckboxLabel htmlFor="privacyPolicy">
              I have read and agree to the{' '}
              <PrivacyLink onClick={() => setShowPrivacyPolicy(true)}>
                Privacy Policy
              </PrivacyLink>
            </CheckboxLabel>
          </CheckboxContainer>
        </PrivacySection>

        <ButtonGroup>
          <SubmitButton type="submit" disabled={isLoading || !formData.acceptedPrivacyPolicy}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </SubmitButton>
          <CancelButton type="button" onClick={handleCancel} disabled={isLoading}>
            Cancel
          </CancelButton>
        </ButtonGroup>
      </Form>

      {showPrivacyPolicy && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={() => setShowPrivacyPolicy(false)}>×</CloseButton>
            <PrivacyPolicy />
            <ModalActions>
              <AcceptButton onClick={handleAcceptPrivacyPolicy}>
                Accept & Continue Registration
              </AcceptButton>
              <DeclineButton onClick={() => setShowPrivacyPolicy(false)}>
                Close
              </DeclineButton>
            </ModalActions>
          </ModalContent>
        </Modal>
      )}
    </FormContainer>
  );
};

const FormContainer = styled.div`
  max-width: 500px;
  width: 90%;
  margin: 2rem auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const Title = styled.h1`
  color: white;
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormField = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 1rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
`;

const SubmitButton = styled(Button)`
  background: #154C79;
  color: white;

  &:hover:not(:disabled) {
    background: #1a5c8f;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ErrorMessage = styled.div`
  color: #ff4444;
  background: rgba(255, 68, 68, 0.1);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
`;

const PrivacySection = styled.div`
  margin-top: 1rem;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
`;

const PrivacyLink = styled.span`
  color: #FFD700;
  text-decoration: underline;
  cursor: pointer;
  
  &:hover {
    color: #FFA500;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: linear-gradient(135deg, #1a2a6c, #b21f1f);
  padding: 2rem;
  border-radius: 15px;
  width: 90%;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.3);

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  justify-content: flex-end;
`;

const AcceptButton = styled.button`
  background: #154C79;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: #1a5c8f;
    transform: translateY(-2px);
  }
`;

const DeclineButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 0.75rem 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export default RegisterForm;