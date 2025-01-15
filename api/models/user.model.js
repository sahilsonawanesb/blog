import mongoose from 'mongoose';


// create schema for the users.
const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
        unique : true,
    },
    
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
}, {timestamps: true}

);

const User = mongoose.model('User', userSchema);

export default User;