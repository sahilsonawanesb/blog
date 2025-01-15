import express from 'express';

// create app
const app = express();

// listen port
app.listen(3000, () => {
    console.log("Server is running on Port 3000");
});