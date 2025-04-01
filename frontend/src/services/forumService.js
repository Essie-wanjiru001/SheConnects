import api from '../config/api';

// Get all forums
export const getForums = async () => {
  try {
    const response = await api.get('/api/forum/forums');
    return response.data.forums;
  } catch (error) {
    console.error('Error fetching forums:', error);
    throw error;
  }
};

// Create new forum
export const createForum = async (forumData) => {
  try {
    const response = await api.post('/api/forum/forums', forumData);
    return response.data;
  } catch (error) {
    console.error('Error creating forum:', error);
    throw error;
  }
};

// Get forum details with discussions
export const getForumById = async (forumId) => {
  try {
    const response = await api.get(`/api/forum/forums/${forumId}`);
    return response.data.forum;
  } catch (error) {
    console.error('Error fetching forum:', error);
    throw error;
  }
};

// Get all discussions for a forum
export const getDiscussions = async (forumId) => {
  try {
    const response = await api.get(`/api/forum/forums/${forumId}/discussions`);
    return response.data.discussions;
  } catch (error) {
    console.error('Error fetching discussions:', error);
    throw error;
  }
};

// Create discussion in forum
export const createDiscussion = async (forumId, content) => {
  try {
    const response = await api.post(`/api/forum/forums/${forumId}/discussions`, { content });
    return response.data.discussion;
  } catch (error) {
    console.error('Error creating discussion:', error);
    throw error;
  }
};

// Get discussion replies
export const getReplies = async (discussionId) => {
  try {
    const response = await api.get(`/api/forum/discussions/${discussionId}/replies`);
    return response.data.replies;
  } catch (error) {
    console.error('Error fetching replies:', error);
    throw error;
  }
};

// Add reply to discussion
export const createReply = async (discussionId, content) => {
  try {
    const response = await api.post(`/api/forum/discussions/${discussionId}/replies`, { content });
    return response.data.reply;
  } catch (error) {
    console.error('Error creating reply:', error);
    throw error;
  }
};

// Update discussion
export const updateDiscussion = async (discussionId, content) => {
  try {
    const response = await api.put(`/api/forum/discussions/${discussionId}`, { content });
    return response.data;
  } catch (error) {
    console.error('Error updating discussion:', error);
    throw error;
  }
};

// Update reply
export const updateReply = async (replyId, content) => {
  try {
    const response = await api.put(`/api/forum/replies/${replyId}`, { content });
    return response.data;
  } catch (error) {
    console.error('Error updating reply:', error);
    throw error;
  }
};

// Delete discussion
export const deleteDiscussion = async (discussionId) => {
  try {
    const response = await api.delete(`/api/forum/discussions/${discussionId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting discussion:', error);
    throw error;
  }
};

// Delete reply
export const deleteReply = async (replyId) => {
  try {
    const response = await api.delete(`/api/forum/replies/${replyId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting reply:', error);
    throw error;
  }
};

export default {
  getForums,
  createForum,
  getForumById,
  getDiscussions,
  createDiscussion,
  getReplies,
  createReply,
  updateDiscussion,
  updateReply,
  deleteDiscussion,
  deleteReply
};