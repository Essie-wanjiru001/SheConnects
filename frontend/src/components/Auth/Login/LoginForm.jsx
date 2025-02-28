import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/authService";

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
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await loginUser(formData);
      console.log('Login successful:', response);
      
      // Store the token
      localStorage.setItem('userToken', response.token);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.error || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <InputField>
          <label htmlFor="email" className="visually-hidden">Email</label>
          <input 
            type="email" 
            id="email" 
            placeholder="email" 
            aria-label="Email"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </InputField>
        <InputField>
          <label htmlFor="password" className="visually-hidden">Password</label>
          <input 
            type="password" 
            id="password" 
            placeholder="password" 
            aria-label="Password"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </InputField>
        <ForgotPassword>forgot password?</ForgotPassword>
        <ButtonGroup>
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </SubmitButton>
          <CancelButton type="button" onClick={handleCancel} disabled={isLoading}>
            Cancel
          </CancelButton>
        </ButtonGroup>
        <SignUpPrompt>
          <NoAccountText>No account yet? </NoAccountText>
          <StyledLink to="/register">Sign Up</StyledLink>
        </SignUpPrompt>
      </form>
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
  border-radius: 30px;
  background-color: rgba(255, 246, 233, 1);
  display: flex;
  width: 604px;
  max-width: 100%;
  flex-direction: column;
  align-items: start;
  padding: 124px 80px 47px;
  font: 500 32px Inter, sans-serif;
  @media (max-width: 991px) {
    padding: 100px 20px 0;
  }
`;

const InputField = styled.div`
  margin-bottom: 34px;
  width: 100%;

  input {
    border-radius: 30px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    width: 100%;
    color: #010101;
    font-weight: 400;
    padding: 23px 27px;
    border: none;
    font-size: 32px;

    &::placeholder {
      color: #010101;
    }
  }
`;

const ForgotPassword = styled.div`
  color: #000101;
  font-size: 24px;
  align-self: end;
  margin-top: 34px;
  cursor: pointer;
  @media (max-width: 991px) {
    margin-right: 4px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-top: 37px;
  width: 100%;
  gap: 20px;
  color: #010101;
  white-space: nowrap;
  justify-content: space-between;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Button = styled.button`
  border-radius: 30px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 6px 42px;
  font-size: 32px;
  border: none;
  cursor: pointer;
  @media (max-width: 991px) {
    white-space: initial;
    padding: 10px 20px;
  }
`;

const SubmitButton = styled(Button)`
  background-color: rgba(64, 162, 227, 1);
  color: #010101;
`;

const CancelButton = styled(Button)`
  background-color: rgba(255, 246, 233, 1);
  color: #010101;
`;

const SignUpPrompt = styled.div`
  align-self: center;
  display: flex;
  margin-top: 81px;
  width: 284px;
  max-width: 100%;
  gap: 13px;
  font-size: 24px;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const NoAccountText = styled.div`
  color: #010101;
  flex-grow: 1;
`;

const StyledLink = styled(Link)`
  color: #000101;
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
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

export default LoginForm;