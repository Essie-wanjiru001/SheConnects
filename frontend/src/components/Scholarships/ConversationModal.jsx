import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { getConversations, addConversationMessage } from '../../services/scholarshipService';

const ConversationModal = ({ applicationId, onClose, application }) => {
  const [conversations, setConversations] = useState([]);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    loadConversations();
  }, [applicationId]);

  useEffect(() => {
    scrollToBottom();
  }, [conversations]);

  const loadConversations = async () => {
    try {
      const data = await getConversations(applicationId);
      setConversations(data);
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() && !file) return;

    const formData = new FormData();
    formData.append('message', message);
    if (file) {
      formData.append('attachment', file);
    }

    try {
      const newConversation = await addConversationMessage(applicationId, formData);
      setConversations([...conversations, newConversation]);
      setMessage('');
      setFile(null);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h2>Application Conversations</h2>
          <StatusBadge status={application.status}>
            {application.status}
          </StatusBadge>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <ConversationContainer>
          {loading ? (
            <Loading>Loading conversations...</Loading>
          ) : conversations.length === 0 ? (
            <EmptyState>No messages yet. Start the conversation!</EmptyState>
          ) : (
            conversations.map((conv) => (
              <Message key={conv.id} $isAdmin={conv.is_admin}>
                <MessageHeader>
                  <Avatar src={conv.profilePicture || '/default-avatar.png'} />
                  <UserName>{conv.user_name}</UserName>
                  <Timestamp>{new Date(conv.created_at).toLocaleString()}</Timestamp>
                </MessageHeader>
                <MessageContent>{conv.message}</MessageContent>
                {conv.attachment_url && (
                  <Attachment href={conv.attachment_url} target="_blank">
                    📎 View Attachment
                  </Attachment>
                )}
              </Message>
            ))
          )}
          <div ref={messagesEndRef} />
        </ConversationContainer>

        <MessageForm onSubmit={handleSubmit}>
          <MessageInput
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <FileInput
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            id="file-input"
          />
          <ButtonGroup>
            <FileLabel htmlFor="file-input">
              📎 {file ? file.name : 'Attach File'}
            </FileLabel>
            <SendButton type="submit">Send</SendButton>
          </ButtonGroup>
        </MessageForm>
      </ModalContent>
    </ModalOverlay>
  );
};

// Styled components for the ConversationModal...
const ModalOverlay = styled.div`
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
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StatusBadge = styled.div`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${props => {
    switch (props.status) {
      case 'IN_PROGRESS': return '#fff3e0';
      case 'SUBMITTED': return '#e3f2fd';
      case 'ACCEPTED': return '#e8f5e9';
      case 'REJECTED': return '#ffebee';
      default: return '#e0e0e0';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'IN_PROGRESS': return '#e65100';
      case 'SUBMITTED': return '#0d47a1';
      case 'ACCEPTED': return '#1b5e20';
      case 'REJECTED': return '#b71c1c';
      default: return '#333';
    }
  }};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #154C79;
  }
`;

const ConversationContainer = styled.div`
  padding: 1rem;
  overflow-y: auto;
  flex: 1;
  max-height: 60vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Message = styled.div`
  background: ${props => props.$isAdmin ? '#f8f9fa' : '#e3f2fd'};
  padding: 1rem;
  border-radius: 8px;
  max-width: 80%;
  align-self: ${props => props.$isAdmin ? 'flex-end' : 'flex-start'};
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserName = styled.span`
  font-weight: 600;
  color: #154C79;
`;

const Timestamp = styled.span`
  font-size: 0.8rem;
  color: #666;
  margin-left: auto;
`;

const MessageContent = styled.p`
  margin: 0;
  color: #333;
  line-height: 1.5;
`;

const Attachment = styled.a`
  display: inline-block;
  margin-top: 0.5rem;
  color: #154C79;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const MessageForm = styled.form`
  padding: 1rem;
  border-top: 1px solid #eee;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MessageInput = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  min-height: 80px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #154C79;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FileLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  color: #666;
  
  &:hover {
    background: #e9ecef;
  }
`;

const SendButton = styled.button`
  padding: 0.5rem 1.5rem;
  background: #154C79;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background: #0d3251;
  }
`;

const Loading = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
  background: #f8f9fa;
  border-radius: 8px;
`;

export default ConversationModal;