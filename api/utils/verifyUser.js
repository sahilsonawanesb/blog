import jwt from 'jsonwebtoken';
import {errorHandler} from './error.js';

export const verifyUser = (req, res, next) => {
    // first get the token of the user from the browser cookie section
    const token = req.cookies.access_token;
    if(!token){
        next(errorHandler(401, 'Unauthorized'));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err){
            return next(errorHandler(401, 'Unauthorized'));
        }
        req.user = user;
        next();
    });
}