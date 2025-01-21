import express from 'express';
import { createComment, getComments, likeComment } from '../controllers/comment.controller.js';
import {verifyUser} from "../utils/verifyUser.js";

const router = express.Router();

// created route for creating new Comment
router.post('/create', verifyUser,createComment);

// created route for getting comments
router.get('/getPostComments/:postId', getComments);

// created route for like comments
router.put('/likeComment/:commentId', verifyUser, likeComment);

export default router;