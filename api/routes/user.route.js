import express from 'express';
import {test, updateUser, deleteUser, signOut} from "../controllers/user.controller.js";
import { verifyUser } from '../utils/verifyUser.js';

// create routes for testing the user api
const router = express.Router();

router.get('/test', verifyUser, (req, res) => {
    res.json({ user: req.user });
});
// created route for updating the user information
router.put('/update/:userId', verifyUser, updateUser);
// created route for deleting the user
router.delete('/delete/:userId', verifyUser, deleteUser);
// created route for signout the user
router.post('/signout', signOut);

export default router;