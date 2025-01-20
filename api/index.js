import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();

// create app
const app = express();

app.use(express.json());
app.use(cookieParser());

// connecting to the database 
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log('MongoDb is Connected');
    }).catch((error) => {
        console.log(error);
    });

// listen port
app.listen(3000, () => {
    console.log("Server is running on Port 3000");
});

// Authentication sign-In and sign-Up Router.
app.use('/api/auth', authRoutes);

// user's Router
app.use('/api/user', userRoutes);

// posts Router
app.use('/api/post', postRoutes);

// comment Router
app.use('/api/comment', commentRoutes);


// creating the middleware for handling rh error.
app.use((err, req, res, next) => {

    const statusCode = err.statusCode || 500;
    const message  = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success : false,
        statusCode,
        message
    });
});