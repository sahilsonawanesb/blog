// Controller function for sample testing of api..

import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
    res.json({
        message : 'API is working properly'
    })
}


// Controller function for updating the user information or Profile
export const updateUser = async(req, res, next) => {
    
    if(req.user.id !== req.params.userId){
        return next(errorHandler(403, 'You are not allowed to update the information'));
    }

    if(req.body.password){
        if(req.body.password.length < 6){
            return next(errorHandler(400, 'Password must be at least 6 characters'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    
    if(req.body.userName){
        if(req.body.userName.length < 7 || req.body.userName.length > 20){
            return next(errorHandler(400, 'Username must be between 7 and 20 characters'));
        }

        if(!req.body.userName.match(/^[a-zA-Z0-9\s]+$/)){
            return next(errorHandler(400, 'Username can only contain letters and numbers'));
        }
    }
    
        try{
            const userUpdate = await User.findByIdAndUpdate(req.params.userId, {
                $set : {
                    userName : req.body.userName,
                    email : req.body.email,
                    password : req.body.password,
                    profilePicture : req.body.profilePicture
                }
            }, {new : true}); //this is will sent back the new data.
            const {password, ...rest} = userUpdate._doc;
            res.status(200).json(rest);
        }catch(error){
            next(error);
        }
}

// Controller function for deleting the user 
export const deleteUser = async(req, res, next) => {
    // check if the user is allowed to delete the account or not
    if(req.user.id !== req.params.userId){
        return next(errorHandler('You are not allowed to delete this user account'));
    }

    try{
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json('User has been Deleted');
    }catch(error){
        next(error);
    }
}
    