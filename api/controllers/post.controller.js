import { errorHandler } from "../utils/error.js";
import Post from '../models/post.modal.js';


// controller function for creating new post.
export const create = async(req, res, next) => {

    // check is user is allowed to create a post or not
    if(!req.user.isAdmin){
        return next(errorHandler(404, 'You are not allowed to create a Post'));
    }

    if(!req.body.title || !req.body.content){
        return next(errorHandler(404, 'Please Provide all required feilds'));
    }

    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
    const newPost = new Post({
        ...req.body, slug, userId : req.user.id
    });

    try{
        const savedPost = await newPost.save();
        res.status(400).json({
            savedPost
        });
    }catch(error){
        next(error);
    }
};