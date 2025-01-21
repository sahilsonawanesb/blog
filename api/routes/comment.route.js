import express from 'express';
import { createComment, getComments } from '../controllers/comment.controller.js';
import {verifyUser} from "../utils/verifyUser.js";

const router = express.Router();

// created route for creating new Comment
router.post('/create', verifyUser,createComment);

// created route for getting comments
router.get('/getPostComments/:postId', getComments);

export default router;