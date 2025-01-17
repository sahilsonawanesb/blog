import express from 'express';
import {test, updateUser} from "../controllers/user.controller.js";
import { verifyUser } from '../utils/verifyUser.js';

// create routes for testing the user api
const router = express.Router();

router.get('/test', verifyUser, (req, res) => {
    res.json({ user: req.user });
});
// created route for updating the user information
router.put('/update/:userId', verifyUser, updateUser);

export default router;