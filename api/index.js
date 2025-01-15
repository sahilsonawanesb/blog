import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

// create app
const app = express();

app.use(express.json());

// connect to the database now
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