import express from 'express';
import {signUp, signIn}  from '../controllers/auth.controller.js';

// create the auth route..
const router = express.Router();

// signUp & signIn route
router.post('/sign-up', signUp);    
router.post('/sign-in', signIn);
// router.post('/google', goolge);

export default router;