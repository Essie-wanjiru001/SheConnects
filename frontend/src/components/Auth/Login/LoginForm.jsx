import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/authService";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await login(formData);
      localStorage.setItem('token', response.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <FormContainer>
      <Title>Welcome Back</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={handleSubmit}>
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

        <ForgotPasswordLink to="/reset-password">
          Forgot Password?
        </ForgotPasswordLink>

        <ButtonGroup>
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </SubmitButton>
          <CancelButton type="button" onClick={handleCancel} disabled={isLoading}>
            Cancel
          </CancelButton>
        </ButtonGroup>

        <SignUpSection>
          Don't have an account?{' '}
          <SignUpLink to="/register">Sign Up</SignUpLink>
        </SignUpSection>
      </Form>
    </FormContainer>
  );
}

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

const ForgotPasswordLink = styled(Link)`
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-size: 0.9rem;
  text-align: right;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;

const SignUpSection = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  margin-top: 1rem;
`;

const SignUpLink = styled(Link)`
  color: #FFD700;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

export default LoginForm;