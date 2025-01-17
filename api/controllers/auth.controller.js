import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// controller function for sign-up
export const signUp = async(req, res, next) => {
   const {userName, email, password} = req.body;

   if (!userName?.trim() || !email?.trim() || !password?.trim()) {
      return next(errorHandler(400, "All fields are required"));
  }
//    securing and hashing the password.
   const hashedPassword = bcryptjs.hashSync(password, 10);

   try {
    //  now create new user as follows..
   const newUser = new User({
    userName : userName.trim(),
    email : email.trim(),
    password:hashedPassword,
   });
    await newUser.save();
    res.json("Sign up sucessfull");
   }catch(error){
    next(error);
   }

}

// controller function for sign-in
export const signIn = async(req, res, next) => {
   const {email, password} = req.body;

   if(!email.trim() || !password.trim() || email === '' || password === ''){
      next(errorHandler(400, 'All feilds are required'));
   }

   try {
      // first validate the user
      const validUser = await User.findOne({email});
      if(!validUser){
         next(errorHandler(400, 'User not found'));
      }
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if(!validPassword){
         return next(errorHandler(400, 'Invalid Password')); 
      }
      // JWT token
      const token = jwt.sign({ id : validUser?._id}, process.env.JWT_SECRET);

      // seperation and hiding the password from the enduser
      const {password : pass, ...rest } = validUser._doc;
      
      // console.log(token)
     res.status(200).cookie('access_token', token, {
         httpOnly : true
      }).json(rest);
  
   } catch (error) {
      next(error)
   }   
   
}

// controller function for googleAuth..
export const goolge = async(req, res, next) => {
   const {email, name, googlePhotoUrl} = req.body;

   try{
      const user = await User.findOne({email});

      // if user exist
      if(user){
         const token = jwt.sign({id : user._id}, process.env.JWT_SECRET);
         const {password, ...rest} = user._doc;
         res.status(200).cookie('access_token', token, {
            httpOnly : true
         }).json(rest);
      }else{
         const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
         const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
         // creating new user 
         const newUser = new User({
            userName : name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
            email,
            password : hashedPassword,
            profilePicture : googlePhotoUrl
         });

         await newUser.save();
         const token = jwt.sign({id : newUser._id}, process.env.JWT_SECRET);
         const {password, ...rest} = newUser._doc;

         res
            .status(200)
            .cookie('access_token', token, {
               httpOnly : true
            }).json(rest);
      }
   }catch(error){
      next(error);
   }

}


export default {signUp, signIn, goolge};