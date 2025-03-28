import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { getConversations, addConversationMessage } from '../../services/scholarshipService';

const ScholarshipStatsModal = ({ scholarship, applications, onClose }) => {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const fileInputRef = useRef(null);

  // Calculate stats
  const stats = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  const handleApplicationClick = async (application) => {
    setSelectedApplication(application);
    try {
      const conversationHistory = await getConversations(application.id);
      setConversations(conversationHistory);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() && !attachment) return;

    const formData = new FormData();
    formData.append('message', newMessage);
    if (attachment) {
      formData.append('attachment', attachment);
    }

    try {
      const response = await fetch(`/api/admin/applications/${selectedApplication.id}/conversations`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      
      if (data.success) {
        setConversations([...conversations, data.conversation]);
        setNewMessage('');
        setAttachment(null);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h2>{scholarship.name} - Applications</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <ModalBody>
          {/* Stats Summary Section */}
          <StatsSection>
            <h3>Application Statistics</h3>
            <StatsGrid>
              <StatCard>
                <StatTitle>In Progress</StatTitle>
                <StatValue>{stats.IN_PROGRESS || 0}</StatValue>
              </StatCard>
              <StatCard>
                <StatTitle>Submitted</StatTitle>
                <StatValue>{stats.SUBMITTED || 0}</StatValue>
              </StatCard>
              <StatCard>
                <StatTitle>Accepted</StatTitle>
                <StatValue>{stats.ACCEPTED || 0}</StatValue>
              </StatCard>
              <StatCard>
                <StatTitle>Rejected</StatTitle>
                <StatValue>{stats.REJECTED || 0}</StatValue>
              </StatCard>
            </StatsGrid>
          </StatsSection>

          {/* Applications and Conversations Section */}
          <ApplicationsSection>
            <ApplicationsList>
              {applications.map((app) => (
                <ApplicationItem 
                  key={app.id}
                  onClick={() => handleApplicationClick(app)}
                  selected={selectedApplication?.id === app.id}
                >
                  <div>
                    <strong>{app.user_name}</strong>
                    <Status status={app.status}>{app.status}</Status>
                  </div>
                  <div>Applied: {new Date(app.last_updated).toLocaleDateString()}</div>
                </ApplicationItem>
              ))}
            </ApplicationsList>

            {selectedApplication && (
              <ConversationSection>
                <h3>Conversation with {selectedApplication.user_name}</h3>
                <ConversationList>
                  {conversations.map((msg) => (
                    <Message key={msg.id} isAdmin={msg.is_admin}>
                      <MessageHeader>
                        <strong>{msg.user_name}</strong>
                        <span>{new Date(msg.created_at).toLocaleString()}</span>
                      </MessageHeader>
                      <MessageContent>{msg.message}</MessageContent>
                      {msg.attachment && (
                        <MessageAttachment href={msg.attachment.url} target="_blank" rel="noopener noreferrer">
                          📎 {msg.attachment.name}
                        </MessageAttachment>
                      )}
                    </Message>
                  ))}
                </ConversationList>
                
                <MessageForm onSubmit={handleSendMessage}>
                  <MessageInputWrapper>
                    <MessageInput
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                    />
                    <AttachmentButton type="button" onClick={handleAttachmentClick}>
                      📎
                      <input
                        ref={fileInputRef}
                        type="file"
                        hidden
                        onChange={(e) => setAttachment(e.target.files[0])}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                    </AttachmentButton>
                  </MessageInputWrapper>
                  {attachment && (
                    <AttachmentPreview>
                      📎 {attachment.name}
                      <RemoveButton onClick={() => setAttachment(null)}>×</RemoveButton>
                    </AttachmentPreview>
                  )}
                  <SendButton type="submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send'}
                  </SendButton>
                </MessageForm>
              </ConversationSection>
            )}
          </ApplicationsSection>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

// Styled components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 1200px;  // Increased from 1000px
  height: 90vh;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ApplicationsList = styled.div`
  flex: 0 0 300px;
  overflow-y: auto;
  border-right: 1px solid #eee;
  padding-right: 1rem;
`;

const ApplicationItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  background: ${props => props.selected ? '#f5f5f5' : 'white'};
  border-radius: 4px;
  transition: background-color 0.2s;
  
  &:hover {
    background: ${props => props.selected ? '#f5f5f5' : '#f8f8f8'};
  }
`;

const Status = styled.span`
  margin-left: 8px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${props => {
    switch (props.status) {
      case 'IN_PROGRESS': return '#ed6c02';
      case 'SUBMITTED': return '#0288d1';
      case 'ACCEPTED': return '#2e7d32';
      case 'REJECTED': return '#d32f2f';
      default: return '#757575';
    }
  }};
  background: ${props => {
    switch (props.status) {
      case 'IN_PROGRESS': return '#fff3e0';
      case 'SUBMITTED': return '#e3f2fd';
      case 'ACCEPTED': return '#e8f5e9';
      case 'REJECTED': return '#ffebee';
      default: return '#f5f5f5';
    }
  }};
`;

const ConversationSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;  // Prevents content from overflowing
`;

const ConversationList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const Message = styled.div`
  margin-bottom: 1rem;
  padding: 0.8rem;
  border-radius: 8px;
  background: ${props => props.isAdmin ? '#e3f2fd' : '#f5f5f5'};
  max-width: 85%;
  margin-left: ${props => props.isAdmin ? '0' : 'auto'};
  margin-right: ${props => props.isAdmin ? 'auto' : '0'};
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
`;

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const MessageContent = styled.div`
  white-space: pre-wrap;
`;

const MessageForm = styled.form`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-top: 1px solid #eee;
  background: white;
`;

const MessageInputWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.5rem;
`;

const MessageInput = styled.textarea`
  flex: 1;
  padding: 0.5rem;
  border: none;
  resize: vertical;
  min-height: 40px;
  max-height: 120px;
`;

const AttachmentButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0 0.5rem;
  
  &:hover {
    opacity: 0.7;
  }
`;

const AttachmentPreview = styled.div`
  font-size: 0.9rem;
  padding: 0.5rem;
  background: #f5f5f5;
  border-radius: 4px;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0;
  color: #666;
  
  &:hover {
    color: #d32f2f;
  }
`;

const SendButton = styled.button`
  padding: 0.5rem 1rem;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:disabled {
    background: #ccc;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const StatsSection = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  flex-shrink: 0;  // Prevents stats from shrinking
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

const StatCard = styled.div`
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
`;

const StatTitle = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1976d2;
`;

const ApplicationsSection = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1rem;
  flex: 1;
  min-height: 0;  // Important for nested flex scrolling
  overflow: hidden;
`;

const MessageAttachment = styled.a`
  display: block;
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: white;
  border-radius: 4px;
  text-decoration: none;
  color: #1976d2;
  
  &:hover {
    background: #f5f5f5;
  }
`;

export default ScholarshipStatsModal;