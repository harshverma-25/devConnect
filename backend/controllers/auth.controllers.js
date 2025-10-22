import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

export const signUp = async (req, res) => {
    
    try{
    const {firstname, lastname, username, email, password} = req.body;
   
    const existEmail = await User.findOne({email});
    const existUserName = await User.findOne({username});
    

    if(existEmail){
        return res.status(400).json({message: "Email already exist"});
    }
    if(existUserName){
        return res.status(400).json({message:"User Already Exist"});
    }

    if(password.length < 8){
        return res.status(400).json({message:"Password must be 8 characters"});
    }
    //Hash the password
    const hashPassword = await bcrypt.hash(password, 10)

    //Create the User
    const user = await User.create({
        firstname, lastname, username, email, password:hashPassword
        
    })

    const token = await genToken(user._id)
    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 7*24*60*60*1000,
        sameSite: "strict",
        secure: process.env.NODE_ENV==="production"

    })

    return res.status(201).json(user)
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"SIgn UP error"})
        
    }
}

export const login = async (req, res) => {
    try{
    const {email, password} = req.body;
   
    const user = await User.findOne({email}); 

   
    if(!user){
        return res.status(400).json({message: "User doesn't exist Please Sign Up"});
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        return res.status(400).json({message:"Password Incorrect"})
    }
   

    const token = await genToken(user._id)
    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 7*24*60*60*1000,
        sameSite: "strict",
        secure: process.env.NODE_ENV==="production"

    })

    return res.status(201).json(user)
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Sign in error"})
        
    }
}

export const logOut = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(400).json({message: "LogOut Successfully"})
    } catch(err){
        console.log(err);
        return res.status(500).json({message:"Sign in error"})
        
    }
}