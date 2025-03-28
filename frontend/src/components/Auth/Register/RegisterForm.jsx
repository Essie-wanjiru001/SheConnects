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

  return (
    <FormWrapper>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <InputGroup>
            <Input
              type="text"
              id="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
            <Input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
            <Input
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
            <Input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </InputGroup>
          
          <PrivacySection>
            <PrivacyPolicy />
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
                I have read and agree to the Privacy Policy
              </CheckboxLabel>
            </CheckboxContainer>
          </PrivacySection>

          <ButtonGroup>
            <SubmitButton type="submit" disabled={isLoading || !formData.acceptedPrivacyPolicy}>
              {isLoading ? 'Registering...' : 'Submit'}
            </SubmitButton>
            <CancelButton type="button" onClick={handleCancel} disabled={isLoading}>
              Cancel
            </CancelButton>
          </ButtonGroup>
        </Form>
      </FormContainer>
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  border-radius: 30px;
  background-color: #fff6e9;
  display: flex;
  margin-left: 23px;
  width: 1007px;
  max-width: 100%;
  flex-direction: column;
  align-items: center;
  color: #010101;
  white-space: nowrap;
  justify-content: center;
  padding: 78px 80px;
  font: 400 32px Inter, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
    padding: 0 20px;
  }
`;

const FormContainer = styled.div`
  background-color: #fff6e9;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px; // Reduced from original size
  margin-top: 40px; // Added spacing from header
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px; // Slightly reduced gap
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 23px 0 9px;
  @media (max-width: 991px) {
    padding-right: 20px;
    white-space: initial;
  }
`;

const Label = styled.label`
  &.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

const Input = styled.input`
  border-radius: 30px;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 8px 27px;
  margin-bottom: 45px;
  width: 100%;
  @media (max-width: 991px) {
    padding: 8px 20px;
    margin-bottom: 20px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-top: 41px;
  align-items: start;
  gap: 20px;
  font-weight: 500;
  justify-content: space-between;
  @media (max-width: 991px) {
    margin: 40px 10px 0 0;
  }
`;

const Button = styled.button`
  border-radius: 30px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 6px 32px;
  font-size: 32px;
  cursor: pointer;
  @media (max-width: 991px) {
    padding: 6px 20px;
  }
`;

const SubmitButton = styled(Button)`
  background-color: #40a2e3;
  color: #010101;
`;

const CancelButton = styled(Button)`
  background-color: #fff6e9;
  color: #010101;
`;

const ErrorMessage = styled.div`
  color: #ff0033;
  background-color: #ffe6e6;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 14px;
`;

const PrivacySection = styled.div`
  margin: 20px 0;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const CheckboxLabel = styled.label`
  font-size: 14px;
  color: #666;
`;

export default RegisterForm;