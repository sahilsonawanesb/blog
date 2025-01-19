import express from 'express';
import { verifyUser } from '../utils/verifyUser.js';
import { create, getPosts } from '../controllers/post.controller.js';

const router = express.Router();

// created route for creating new POST
router.post('/create', verifyUser, create);

// created route for getting the POST
router.get('/getposts', getPosts);

export default router;