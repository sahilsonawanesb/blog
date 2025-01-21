import { errorHandler } from "../utils/error.js";
import Comment from "../models/comment.modal.js"
import { trusted } from "mongoose";




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

export const likeComment = async(req, res, next) => {

    try{
        const comment = await Comment.findById(req.params.commentId);
    if(!comment){
        return next(errorHandler(404, 'Comment not found'));
    }
    const userIndex = comment.likes.indexOf(req.user.id);
    if(userIndex === -1){
        comment.numberOflikes += 1;
        comment.likes.push(req.user.id);
    }else{
         comment.numberOflikes -= 1;
         comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json(comment);
    }catch(error){
        next(error)
    }
    
};

// controller function for editing the comments of the post.
export const editComment = async(req, res, next) => {
    try{
        const comment = await Comment.findById(req.params.commentId);

        if(!comment){
            return next(errorHandler(404, 'Comment not found'));
        }

        if(comment.userId !== req.user.id && !req.user.isAdmin){
            return next(errorHandler(403, 'You are not allowed to edit this comment'));
        }

        const editComment = await Comment.findByIdAndUpdate(req.params.commentId, {
            content : req.body.content,
        },
        {new : true}
    );

    res.status(200).json(editComment);
    }catch(error){
        next(error);
    }
};