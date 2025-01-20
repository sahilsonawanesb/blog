import express from 'express';
import { createComment } from '../controllers/comment.controller.js';
import {verifyUser} from "../utils/verifyUser.js";

const router = express.Router();

// controller function for creating new Comment
router.post('/create', verifyUser,createComment);

export default router;