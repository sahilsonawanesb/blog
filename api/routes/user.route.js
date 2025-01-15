import express from 'express';
import {test} from "../controllers/user.controller.js";

// create routes for testing the user api
const router = express.Router();

router.get('/test', test);

export default router;