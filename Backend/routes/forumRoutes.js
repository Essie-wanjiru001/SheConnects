const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const auth = require('../middleware/auth');

// Forum routes
router.get('/forums', forumController.getAllForums);
router.post('/forums', auth, forumController.createForum);
router.get('/forums/:id', forumController.getForumById);

// Discussion routes
router.get('/forums/:id/discussions', forumController.getDiscussions); // Add this new route
router.post('/forums/:id/discussions', auth, forumController.createDiscussion);
router.put('/discussions/:id', auth, forumController.updateDiscussion);
router.delete('/discussions/:id', auth, forumController.deleteDiscussion);

// Reply routes
router.get('/discussions/:id/replies', forumController.getReplies);
router.post('/discussions/:id/replies', auth, forumController.createReply);
router.put('/replies/:id', auth, forumController.updateReply);
router.delete('/replies/:id', auth, forumController.deleteReply);

module.exports = router;