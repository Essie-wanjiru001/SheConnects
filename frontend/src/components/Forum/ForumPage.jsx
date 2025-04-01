import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import DashboardHeader from '../Dashboard/DashboardHeader';
import Sidebar from '../Dashboard/Sidebar';
import { useSidebar } from '../../contexts/SidebarContext';
import { getForums, createForum, getDiscussions, createDiscussion, createReply, updateDiscussion, updateReply, deleteDiscussion, deleteReply } from '../../services/forumService';
import CreateForumModal from './CreateForumModal';
import { useUser } from '../../contexts/UserContext';

const ForumPage = () => {
  const { currentUser } = useUser();
  // Add this console log to check what we're getting
  console.log("Current user:", currentUser);
  console.log("Current user ID:", currentUser?.id); // Check which ID format we're using

  const { isSidebarOpen } = useSidebar();
  const [forums, setForums] = useState([]);
  const [showNewForumModal, setShowNewForumModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedForum, setSelectedForum] = useState(null);
  const [discussions, setDiscussions] = useState([]);
  const [newDiscussion, setNewDiscussion] = useState('');
  const [newReply, setNewReply] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [editingDiscussion, setEditingDiscussion] = useState(null);
  const [editingReply, setEditingReply] = useState(null);
  const [editContent, setEditContent] = useState('');

  const categories = [
    'General Discussion',
    'Scholarship Tips',
    'Internship Experience',
    'Career Advice',
    'Tech Talk',
    'Success Stories'
  ];

  useEffect(() => {
    fetchForums();
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedForum) {
      fetchDiscussions(selectedForum.id);
    }
  }, [selectedForum]);

  const fetchForums = async () => {
    try {
      const forums = await getForums();
      setForums(forums.filter(forum => 
        selectedCategory === 'all' || forum.category === selectedCategory
      ));
    } catch (error) {
      console.error('Error fetching forums:', error);
    }
  };

  const fetchDiscussions = async (forumId) => {
    try {
      const data = await getDiscussions(forumId);
      setDiscussions(data);
    } catch (error) {
      console.error('Error fetching discussions:', error);
    }
  };

  const handleCreateForum = async (forumData) => {
    try {
      const response = await createForum(forumData);
      if (response.success) {
        setShowNewForumModal(false);
        fetchForums();
      }
    } catch (error) {
      console.error('Error creating forum:', error);
    }
  };

  const handleCreateDiscussion = async (e) => {
    e.preventDefault();
    if (!newDiscussion.trim()) return;

    try {
      // Add debug logging
      console.log('Current user:', currentUser);
      console.log('Current user ID:', currentUser?.id);
      const discussion = await createDiscussion(selectedForum.id, newDiscussion);
      console.log('Created discussion:', discussion);
      setNewDiscussion('');
      fetchDiscussions(selectedForum.id);
    } catch (error) {
      console.error('Error creating discussion:', error);
    }
  };

  const handleCreateReply = async (e) => {
    e.preventDefault();
    if (!newReply.trim()) return;

    try {
      await createReply(replyingTo.id, newReply);
      setNewReply('');
      setReplyingTo(null);
      fetchDiscussions(selectedForum.id);
    } catch (error) {
      console.error('Error creating reply:', error);
    }
  };

  const handleEditDiscussion = async (e) => {
    e.preventDefault();
    try {
      await updateDiscussion(editingDiscussion.id, editContent);
      fetchDiscussions(selectedForum.id);
      setEditingDiscussion(null);
      setEditContent('');
    } catch (error) {
      console.error('Error updating discussion:', error);
    }
  };

  const handleEditReply = async (e) => {
    e.preventDefault();
    try {
      await updateReply(editingReply.id, editContent);
      setEditingReply(null);
      setEditContent('');
      fetchDiscussions(selectedForum.id);
    } catch (error) {
      console.error('Error updating reply:', error);
    }
  };

  const handleDeleteDiscussion = async (discussionId) => {
    if (window.confirm('Are you sure you want to delete this discussion?')) {
      try {
        await deleteDiscussion(discussionId);
        fetchDiscussions(selectedForum.id);
      } catch (error) {
        console.error('Error deleting discussion:', error);
      }
    }
  };

  const handleDeleteReply = async (replyId) => {
    if (window.confirm('Are you sure you want to delete this reply?')) {
      try {
        await deleteReply(replyId);
        fetchDiscussions(selectedForum.id);
      } catch (error) {
        console.error('Error deleting reply:', error);
      }
    }
  };

  return (
    <DashboardWrapper>
      <DashboardHeader />
      <MainContent>
        <Sidebar />
        <ContentSection $isSidebarOpen={isSidebarOpen}>
          <PageTitle>Community Forums</PageTitle>
          
          <ForumContainer>
            <CategorySection>
              <h3>Categories</h3>
              <CategoryList>
                <CategoryItem 
                  $active={selectedCategory === 'all'}
                  onClick={() => setSelectedCategory('all')}
                >
                  All Forums
                </CategoryItem>
                {categories.map(category => (
                  <CategoryItem
                    key={category}
                    $active={selectedCategory === category}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </CategoryItem>
                ))}
              </CategoryList>
              <CreateForumButton onClick={() => setShowNewForumModal(true)}>
                Create New Forum
              </CreateForumButton>
            </CategorySection>

            <MainForumSection>
              {!selectedForum ? (
                <ForumsList>
                  {forums.map(forum => (
                    <ForumCard key={forum.id} onClick={() => setSelectedForum(forum)}>
                      <ForumTitle>{forum.title}</ForumTitle>
                      <ForumDescription>{forum.description}</ForumDescription>
                      <ForumMeta>
                        <span>Created by: {forum.creator_name}</span>
                        <span>{forum.discussions_count} discussions</span>
                        <CategoryTag>{forum.category}</CategoryTag>
                      </ForumMeta>
                    </ForumCard>
                  ))}
                </ForumsList>
              ) : (
                <DiscussionSection>
                  <FixedForumInfo>
                    <BackButton onClick={() => setSelectedForum(null)}>
                      ← Back to Forums
                    </BackButton>
                    <h2>{selectedForum.title}</h2>
                    <ForumDescription>{selectedForum.description}</ForumDescription>
                    <CategoryTag>{selectedForum.category}</CategoryTag>
                  </FixedForumInfo>

                  <DiscussionsList>
                    {discussions.map(discussion => (
                      <DiscussionContainer key={discussion.id}>
                        <DiscussionCard>
                          <AuthorInfo>
                            <AuthorName>
                              {discussion.user_id === currentUser?.id ? 'You' : discussion.author_name}
                            </AuthorName>
                            <TimeStamp>
                              {new Date(discussion.created_at).toLocaleString()}
                            </TimeStamp>
                          </AuthorInfo>
                          
                          {editingDiscussion?.id === discussion.id ? (
                            <EditForm onSubmit={handleEditDiscussion}>
                              <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                required
                              />
                              <ButtonGroup>
                                <CancelButton onClick={() => {
                                  setEditingDiscussion(null);
                                  setEditContent('');
                                }}>
                                  Cancel
                                </CancelButton>
                                <SubmitButton type="submit">Save Changes</SubmitButton>
                              </ButtonGroup>
                            </EditForm>
                          ) : (
                            <>
                              <DiscussionContent>{discussion.content}</DiscussionContent>
                              {discussion.user_id === parseInt(currentUser?.id) && (
                                <ActionButtons>
                                  <ActionButton onClick={() => {
                                    setEditingDiscussion(discussion);
                                    setEditContent(discussion.content);
                                  }}>Edit</ActionButton>
                                  <ActionButton onClick={() => handleDeleteDiscussion(discussion.id)}>
                                    Delete
                                  </ActionButton>
                                </ActionButtons>
                              )}
                              {discussion.user_id !== parseInt(currentUser?.id) && (
                                <ReplyButton onClick={() => setReplyingTo(discussion)}>
                                  Reply
                                </ReplyButton>
                              )}
                            </>
                          )}

                          {/* Replies Section */}
                          <RepliesSection>
                            {discussion.replies?.map(reply => (
                              <ReplyCard key={reply.id}>
                                <AuthorInfo>
                                  <AuthorName>
                                    {reply.user_id === currentUser?.id ? 'You' : reply.author_name}
                                  </AuthorName>
                                  <TimeStamp>
                                    {new Date(reply.created_at).toLocaleString()}
                                  </TimeStamp>
                                </AuthorInfo>
                                {editingReply?.id === reply.id ? (
                                  <EditForm onSubmit={handleEditReply}>
                                    <textarea
                                      value={editContent}
                                      onChange={(e) => setEditContent(e.target.value)}
                                      required
                                    />
                                    <ButtonGroup>
                                      <CancelButton onClick={() => {
                                        setEditingReply(null);
                                        setEditContent('');
                                      }}>Cancel</CancelButton>
                                      <SubmitButton type="submit">Save Changes</SubmitButton>
                                    </ButtonGroup>
                                  </EditForm>
                                ) : (
                                  <>
                                    <ReplyContent>{reply.content}</ReplyContent>
                                    {reply.user_id === currentUser?.id && (
                                      <ActionButtons>
                                        <ActionButton onClick={() => {
                                          setEditingReply(reply);
                                          setEditContent(reply.content);
                                        }}>Edit</ActionButton>
                                        <ActionButton onClick={() => handleDeleteReply(reply.id)}>
                                          Delete
                                        </ActionButton>
                                      </ActionButtons>
                                    )}
                                  </>
                                )}
                              </ReplyCard>
                            ))}
                          </RepliesSection>

                          {/* Reply Form */}
                          {replyingTo?.id === discussion.id && (
                            <ReplyForm onSubmit={handleCreateReply}>
                              <textarea
                                value={newReply}
                                onChange={(e) => setNewReply(e.target.value)}
                                placeholder="Write your reply..."
                                required
                              />
                              <ButtonGroup>
                                <CancelButton type="button" onClick={() => {
                                  setReplyingTo(null);
                                  setNewReply('');
                                }}>Cancel</CancelButton>
                                <SubmitButton type="submit">Post Reply</SubmitButton>
                              </ButtonGroup>
                            </ReplyForm>
                          )}
                        </DiscussionCard>
                      </DiscussionContainer>
                    ))}
                  </DiscussionsList>

                  <NewDiscussionForm onSubmit={handleCreateDiscussion}>
                    <textarea
                      value={newDiscussion}
                      onChange={(e) => setNewDiscussion(e.target.value)}
                      placeholder="Contribute to the conversation..."
                      required
                    />
                    <SubmitButton type="submit">Add your reply</SubmitButton>
                  </NewDiscussionForm>
                </DiscussionSection>
              )}
            </MainForumSection>
          </ForumContainer>
        </ContentSection>
      </MainContent>

      {showNewForumModal && (
        <CreateForumModal
          onClose={() => setShowNewForumModal(false)}
          onSubmit={handleCreateForum}
          categories={categories}
          initialCategory={selectedCategory !== 'all' ? selectedCategory : ''}  // Pre-select current category
        />
      )}
    </DashboardWrapper>
  );
};

const ContentSection = styled.section`
  margin-left: ${props => props.$isSidebarOpen ? '280px' : '0'};
  width: ${props => props.$isSidebarOpen ? 'calc(100% - 280px)' : '100%'};
  transition: all 0.3s ease;
  background-color: #f5f5f5;
  min-height: calc(100vh - 70px);
  padding: 2rem;
`;

const ForumContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const MainForumSection = styled.div`
  flex: 1;
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const DiscussionContainer = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  margin-bottom: 1.5rem;
`;

const DiscussionCard = styled.div`
  padding: 1.5rem;
`;

const RepliesSection = styled.div`
  margin-left: 2rem;
  margin-top: 1rem;
  padding-left: 1rem;
  border-left: 2px solid #e0e0e0;
`;

const ReplyCard = styled.div`
  background: #f8f9fa;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 6px;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

const AuthorName = styled.span`
  font-weight: 600;
  color: #2c3e50;
`;

const TimeStamp = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const DiscussionContent = styled.p`
  color: #333;
  margin: 1rem 0;
  line-height: 1.5;
`;

const ReplyContent = styled.p`
  color: #333;
  margin: 0.5rem 0;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  background: transparent;
  border: 1px solid #1a2a6c;
  color: #1a2a6c;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: rgba(26, 42, 108, 0.1);
  }
`;

const ReplyButton = styled(ActionButton)`
  margin-top: 1rem;
`;

const ReplyForm = styled.form`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;

  textarea {
    width: 100%;
    min-height: 100px;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const SubmitButton = styled.button`
  background: #1a2a6c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #141e4c;
  }
`;

const CancelButton = styled.button`
  background: transparent;
  border: 1px solid #666;
  color: #666;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

const DashboardWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a2a6c, #b21f1f);
`;

const MainContent = styled.main`
  display: flex;
  padding: 20px;
  margin-top: 70px;
`;

const PageTitle = styled.h1`
  color: 1a2a6c;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const CategorySection = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  min-width: 250px;
  height: fit-content;

  h3 {
    color: #1a2a6c;
    margin-bottom: 1rem;
    font-weight: 600;
  }
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CategoryItem = styled.button`
  background: ${props => props.$active ? '#1a2a6c' : '#f0f2f5'};
  border: 1px solid #1a2a6c;
  color: ${props => props.$active ? 'white' : '#1a2a6c'};
  padding: 0.75rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  font-weight: 500;

  &:hover {
    background: ${props => props.$active ? '#141e4c' : '#e4e6eb'};
  }
`;

const ForumsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ForumCard = styled.div`
  background: #1a2a6c;
  border-radius: 12px;
  padding: 1.5rem;
  transition: transform 0.2s;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-2px);
    background: #233176;
  }
`;

const ForumTitle = styled.h3`
  color: white;
  margin: 0;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const ForumMeta = styled.div`
  display: flex;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin-top: 1rem;
  align-items: center;
  flex-wrap: wrap;

  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const CategoryTag = styled.span`
  background: rgba(255, 215, 0, 0.2);
  color: #FFD700;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-weight: 500;
`;

const CreateForumButton = styled.button`
  width: 100%;
  background: #FFD700;
  color: #1a2a6c;
  border: none;
  border-radius: 8px;
  padding: 0.75rem;
  margin-top: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(255, 215, 0, 0.4);
  }
`;

const DiscussionSection = styled.div`
  width: 100%;
`;

const FixedForumInfo = styled.div`
  position: sticky;
  top: 70px;
  background: rgba(26, 42, 108, 0.95);
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  backdrop-filter: blur(10px);
  z-index: 10;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ForumDescription = styled.p`
  color: rgba(255, 255, 255, 0.9);
  margin: 0.5rem 0;
  font-size: 0.95rem;
  line-height: 1.4;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #FFD700;
  cursor: pointer;
  padding: 0;
  font-size: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const NewDiscussionForm = styled.form`
  margin-bottom: 2rem;
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  textarea {
    width: 100%;
    min-height: 100px;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #1a2a6c;
    background: white;
    color: #333;
    margin-bottom: 1rem;
    resize: vertical;

    &::placeholder {
      color: #666;
    }

    &:focus {
      outline: none;
      border-color: #1a2a6c;
      box-shadow: 0 0 0 2px rgba(26, 42, 108, 0.1);
    }
  }

  ${SubmitButton} {
    margin-left: auto;
    display: block;
  }
`;

const DiscussionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const EditForm = styled.form`
  margin-top: 0.5rem;

  textarea {
    width: 100%;
    min-height: 80px;
    padding: 0.75rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.1);
    color: white;
    margin-bottom: 1rem;
    resize: vertical;

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }
`;

export default ForumPage;