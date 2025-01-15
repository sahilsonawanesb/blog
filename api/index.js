import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// create app
const app = express();
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