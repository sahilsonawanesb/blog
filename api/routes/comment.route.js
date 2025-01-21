import express from 'express';
import { createComment, getComments, likeComment, editComment, deleteComment } from '../controllers/comment.controller.js';
import {verifyUser} from "../utils/verifyUser.js";

const router = express.Router();

// created route for creating new Comment
router.post('/create', verifyUser,createComment);

// created route for getting comments
router.get('/getPostComments/:postId', getComments);

// created route for like comments
router.put('/likeComment/:commentId', verifyUser, likeComment);

// created route for edit comments
router.put('/editComment/:commentId', verifyUser, editComment);

// created route for delete functionality
router.delete('/deleteComment/:commentId', verifyUser, deleteComment);

export default router;