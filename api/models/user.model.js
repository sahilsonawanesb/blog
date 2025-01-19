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
    profilePicture : {
        type : String,
        default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    isAdmin : {
        type : String,
        default : false,
    },
}, {timestamps: true}

);

const User = mongoose.model('User', userSchema);

export default User;