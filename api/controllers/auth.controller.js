import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

// controller function for sign-up
const signUp = async(req, res) => {
   const {userName, email, password} = req.body;

   if(!userName || !email || !password || userName.trim() === '' || email.trim() === '' || password.trim() === ''){
    return res.status(400).json({message:'All feilds are required'});
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
    res.status(500).json({message : error.message});
   }

}


export default signUp;