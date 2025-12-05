import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export const authUser = async (req, res, next) => {
    try{
        const token = req.cookies.jwt_ums;
        if(!token){
            return res.status(400).json({message: "Not authorized - token is not provided!"});
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(400).json({message: "Invalid token!"})
        }
    
        const user = await User.findById(decoded.id).select("-password");
        if(!user){
            res.status(404).json({message: "User not found!"});
        }
    
        req.user = user;
    
        next();

    }catch(error){
        console.log("Error in authMiddleware:", error);
        res.status(500).json({message: "Internal server error"});
    }
}