import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

// controller function for sign-up
const signUp = async(req, res, next) => {
   const {userName, email, password} = req.body;

   if(!userName || !email || !password || userName.trim() === '' || email.trim() === '' || password.trim() === ''){
      next(errorHandler(404, 'All feilds are required'));
   }

//    securing and hashing the password.
   const hashedPassword = bcryptjs.hashSync(password, 10);

   try {
    //  now create new user as follows..
   const newUser = new User({
    userName : userName.trim(),
    email,
    password:hashedPassword,
   });
    await newUser.save();
    res.json("Sign up sucessfull");
   }catch(error){
    next(error);
   }

}


export default signUp;