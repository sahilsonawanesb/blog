import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

// create app
const app = express();

app.use(express.json());

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