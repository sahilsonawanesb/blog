import { errorHandler } from "../utils/error.js";
import Comment from "../models/comment.modal.js"




// controller function for creating new Comment
export const createComment = async(req, res, next) => {

    try{
    const {content, postId, userId} = req.body;
    console.log(req.user.id);
    console.log(userId);

    if(userId !== req.user.id){
        return next(errorHandler(404, 'You are not allowed to create this comment'));
    }
    const newComment = new Comment({
        content,
        postId,
        userId
    });

    await newComment.save();
    res.status(200).json(newComment); 
    } catch(error){ 
        next(error);
    }
};

// controller function for getting Comments
export const getComments = async(req, res, next) => {

    try{
        const comments = await Comment.find({postId : req.params.postId}).sort({
            createdAt:-1,
        });
        res.status(200).json(comments);
        console.log(comments);
    }catch(error){
        next(error);
    }
};