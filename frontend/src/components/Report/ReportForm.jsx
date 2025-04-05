import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import DashboardHeader from '../Dashboard/DashboardHeader';
import Sidebar from '../Dashboard/Sidebar';
import { useSidebar } from '../../contexts/SidebarContext';
import { submitFeedback } from '../../services/feedbackService';
import { useUser } from '../../contexts/UserContext';

const ReportForm = ({ onSubmitSuccess }) => {
  const { currentUser } = useUser();
  const { isSidebarOpen } = useSidebar();
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    priority: 'medium',
    attachments: null
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast.error('Please log in to submit a report');
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('userId', currentUser.id);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('priority', formData.priority);
      
      if (formData.attachments) {
        formDataToSend.append('attachment', formData.attachments);
      }

      await submitFeedback(formDataToSend);
      toast.success('Thank you for your feedback!');
      setFormData({
        category: '',
        title: '',
        description: '',
        priority: 'medium',
        attachments: null
      });
      
      // Call the success callback
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardWrapper>
      <DashboardHeader />
      <MainContent>
        <Sidebar />
        <ContentSection $isSidebarOpen={isSidebarOpen}>
          <FormContainer>
            <FormTitle>Platform Feedback</FormTitle>
            <FormDescription>
              Help us improve SheConnects by sharing your feedback or reporting any issues you've encountered.
            </FormDescription>

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="improvement">Improvement Suggestion</option>
                  <option value="other">Other</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Title</Label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Brief title for your feedback"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Please provide detailed information about your feedback or issue"
                  rows="6"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Priority Level</Label>
                <Select
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Attachments (Optional)</Label>
                <Input
                  type="file"
                  onChange={(e) => setFormData({...formData, attachments: e.target.files[0]})}
                  accept="image/*,.pdf,.doc,.docx"
                />
                <HelpText>Supported formats: Images, PDF, DOC, DOCX (Max 5MB)</HelpText>
              </FormGroup>

              <SubmitButton type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Feedback'}
              </SubmitButton>
            </Form>
          </FormContainer>
        </ContentSection>
      </MainContent>
    </DashboardWrapper>
  );
};

const DashboardWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a2a6c, #b21f1f);
`;

const MainContent = styled.main`
  display: flex;
  padding: 20px;
  margin-top: 70px;
`;

const ContentSection = styled.section`
  margin-left: ${props => props.$isSidebarOpen ? '280px' : '0'};
  width: ${props => props.$isSidebarOpen ? 'calc(100% - 280px)' : '100%'};
  transition: all 0.3s ease;
`;

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const FormTitle = styled.h1`
  color: white;
  margin-bottom: 0.5rem;
  font-size: 2rem;
  text-align: center;
`;

const FormDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: white;
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  resize: vertical;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;

  option {
    background: #1a2a6c;
    color: white;
  }
`;

const SubmitButton = styled.button`
  padding: 1rem;
  border-radius: 8px;
  border: none;
  background: #FFD700;
  color: #1a2a6c;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #FFC700;
    transform: translateY(-2px);
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const HelpText = styled.small`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
`;

export default ReportForm;