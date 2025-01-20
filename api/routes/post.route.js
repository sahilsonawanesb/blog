import express from 'express';
import { verifyUser } from '../utils/verifyUser.js';
import { create, getPosts, deletePost, updatePost } from '../controllers/post.controller.js';

const router = express.Router();

// created route for creating new POST
router.post('/create', verifyUser, create);

// created route for getting the POST
router.get('/getposts', getPosts);

// created route for deleting the POST
router.delete('/deletepost/:postId/:userId', verifyUser, deletePost);

// created route for updating the POST
router.put('/update-post/:postId/:userId', verifyUser, updatePost);

export default router;