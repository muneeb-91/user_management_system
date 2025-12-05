import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import {generateToken} from '../lib/jwt.js';

export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: "Email is already registered!"});
        }
        if(password.length < 6){
            return res.status(400).json({message: "Password must be atleast 6 characters!"});
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let newUser = null;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS){
            newUser = new User({
            fullName: "Admin",
            email,
            password: hashedPassword,
            role: "admin",
        });
        }else{
            newUser = new User({
                fullName,
                email,
                password: hashedPassword,
            });
        }

        if(newUser){
            await newUser.save();
            generateToken(newUser._id, res);
            res.status(201).json({message: "User is registered successfully!"});
        }else{
            res.status(400).json({message: "Invalid user data!"});
        }
    }catch(error){
        console.log("Error in signup controller:", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const login = async(req, res) => {
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid Credentials!"});
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({message: "Invalid Credentials!"});
        }

        generateToken(user._id, res);
        res.status(201).json({message: "Login successful!"});
    }catch(error){
        console.log("Error in login controller:", error);
        res.status(500).json({message: "Internal server error"});
    }
        
}

export const logout = async(req, res) => {
    try{
        res.cookie('jwt_ums', '', {maxAge: 0});
        res.status(201).json({message: "Logout successful!"})
    }catch(error){
        console.log("Error in logout controller:", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const checkAuth = (req, res) => {
    try{
        res.status(201).json(req.user);
    }catch(error){
        console.log("Error in checkAuth controller:", error);
        res.status(500).json({message: "Internal server error!"});
    }
}


// Admin Side Logic
export const getAllUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.status(201).json(users);
    }catch(error){
        console.log("Error in getUser controller:", error);
        res.status(500).json({messgae: "Internal server error!"});
    }
}

export const updateUser = async (req, res) => {
    try{
        const {id} = req.params;
        const {fullName, email} = req.body;

        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message: "User is not found"});
        }
        if(user.email === process.env.ADMIN_EMAIL){
            return res.status(400).json({message: "This admin can't be edit"});
        }

        if(email && email !== user.email){
            const emailExists = await User.findOne({email});
            if(emailExists){
                return res.status(400).json({message: "This email is already taken"});
            }
            user.email = email;
        }

        if(fullName){
            user.fullName = fullName;
        }

        await user.save();

        return res.status(200).json({message: "User updated Successfully!", user});
        
    }catch(error){
        console.log("Error in updateUser controller:", error);
        return res.status(500).json({message: "Internal server error!"});
    }
}

export const deleteUser = async (req, res) => {
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user){
            res.status(404).json({message: "User not found"});
        }
        if(user.email === process.env.ADMIN_EMAIL){
            res.status(400).json({message: "This Admin can't be deleted"});
        }else{
            await User.findByIdAndDelete(id);
        }

        return res.status(200).json({message: "User is deleted successfully!"})
    }catch(error){
        console.log("Error in deleteUser Controller:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const toggleRole = async (req, res) => {
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message: "User is not found!"});
        }
        if(user.email === process.env.ADMIN_EMAIL){
            return res.status(400).json({message: "Sorry, This admin can't be a user!"})
        }
        if(await User.countDocuments({role: 'admin'}) === 1 && user.role === 'admin'){
            return res.status(400).json({message: "There should be at least one admin"})
        }
        user.role = user.role === 'admin' ? 'user' : 'admin';
        await user.save();
        return res.status(200).json({message: "User role has been changed!"});
    }catch(error){
        console.log("Error in toggleRole controller:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const addUser = async (req, res) => {
    try{
        const {fullName, email, password, role} = req.body;
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message: "Email is already registered!"});
        }
        if(password.length < 6){
            return res.status(400).json({message: "Password should be at least 6 characters!"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            role,
        })
    
        await newUser.save();
        return res.status(200).json({message: "User is added successfully", user: newUser});
    }catch(error){
        console.log("Error in addUser controller:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}