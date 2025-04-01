const Forum = require('../models/forum');

const forumController = {
  // Get all forums with discussions count
  getAllForums: async (req, res) => {
    try {
      const forums = await Forum.getAllForums();
      res.json({ success: true, forums });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch forums' });
    }
  },

  // Create new forum
  createForum: async (req, res) => {
    try {
      const { title, description, category } = req.body;
      const userId = req.user.id;

      const forumId = await Forum.createForum(userId, { title, description, category });
      res.status(201).json({
        success: true,
        message: 'Forum created successfully',
        forumId
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Failed to create forum' });
    }
  },

  // Get forum details with discussions
  getForumById: async (req, res) => {
    try {
      const forum = await Forum.getForumById(req.params.id);
      if (!forum) {
        return res.status(404).json({ success: false, message: 'Forum not found' });
      }
      res.json({ success: true, forum });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch forum' });
    }
  },

  // Create discussion in forum
  createDiscussion: async (req, res) => {
    try {
      const { content } = req.body;
      const forumId = req.params.id;
      const userId = req.user.id;

      const discussion = await Forum.createDiscussion(forumId, userId, content);
      res.status(201).json({
        success: true,
        message: 'Discussion created successfully',
        discussion
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Failed to create discussion' });
    }
  },

  // Get discussions for a forum
  getDiscussions: async (req, res) => {
    try {
      const forumId = req.params.id;
      const discussions = await Forum.getForumDiscussions(forumId);
      
      // Fetch replies for each discussion
      for (let discussion of discussions) {
        const replies = await Forum.getReplies(discussion.id);
        discussion.replies = replies;
      }

      res.json({ 
        success: true, 
        discussions 
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch discussions' 
      });
    }
  },

  // Get discussion replies
  getReplies: async (req, res) => {
    try {
      const replies = await Forum.getReplies(req.params.id);
      res.json({ success: true, replies });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch replies' });
    }
  },

  // Add reply to discussion
  createReply: async (req, res) => {
    try {
      const { content } = req.body;
      const discussionId = req.params.id;
      const userId = req.user.id;

      const reply = await Forum.createReply(discussionId, userId, content);
      res.status(201).json({
        success: true,
        message: 'Reply added successfully',
        reply
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Failed to add reply' });
    }
  },

  // Update discussion
  updateDiscussion: async (req, res) => {
    try {
      const { content } = req.body;
      const success = await Forum.updateDiscussion(req.params.id, req.user.id, content);
      
      if (!success) {
        return res.status(403).json({ 
          success: false, 
          message: 'Discussion not found or unauthorized' 
        });
      }

      res.json({ success: true, message: 'Discussion updated successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Failed to update discussion' });
    }
  },

  // Update reply
  updateReply: async (req, res) => {
    try {
      const { content } = req.body;
      const success = await Forum.updateReply(req.params.id, req.user.id, content);
      
      if (!success) {
        return res.status(403).json({ 
          success: false, 
          message: 'Reply not found or unauthorized' 
        });
      }

      res.json({ success: true, message: 'Reply updated successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Failed to update reply' });
    }
  },

  // Delete discussion
  deleteDiscussion: async (req, res) => {
    try {
      const success = await Forum.deleteDiscussion(req.params.id, req.user.id);
      
      if (!success) {
        return res.status(403).json({ 
          success: false, 
          message: 'Discussion not found or unauthorized' 
        });
      }

      res.json({ success: true, message: 'Discussion deleted successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Failed to delete discussion' });
    }
  },

  // Delete reply
  deleteReply: async (req, res) => {
    try {
      const success = await Forum.deleteReply(req.params.id, req.user.id);
      
      if (!success) {
        return res.status(403).json({ 
          success: false, 
          message: 'Reply not found or unauthorized' 
        });
      }

      res.json({ success: true, message: 'Reply deleted successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Failed to delete reply' });
    }
  }
};

module.exports = forumController;