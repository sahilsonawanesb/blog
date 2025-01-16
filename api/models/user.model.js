import mongoose from 'mongoose';


// create schema for the users.
const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required: [true, "User name is required"],
        unique : true,
    },

    email : {
        type : String,
        required: [true, "Email is required"],
        unique : true,
    },
    password : {
        type : String,
        required: [true, "Password is required"],
    },
}, {timestamps: true}

);

const User = mongoose.model('User', userSchema);

export default User;