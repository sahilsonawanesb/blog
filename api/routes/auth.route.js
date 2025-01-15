import express from 'express';
import signUp  from '../controllers/auth.controller.js';

// create the auth route..
const router = express.Router();

// signUp route
router.post('/sign-up', signUp);

export default router;