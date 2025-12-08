import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
    try {
        const { firstname, lastname, username, email, password } = req.body;

        const existEmail = await User.findOne({ email });
        const existUserName = await User.findOne({ username });

        if (existEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }
        if (existUserName) {
            return res.status(400).json({ message: "Username already exists" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstname,
            lastname,
            username,
            email,
            password: hashPassword
        });

        const token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        });

        return res.status(201).json(user);
    } catch (err) {
        console.error("Signup Error:", err);
        return res.status(500).json({ message: "Signup error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User does not exist. Please sign up." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        const token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        });

        return res.status(200).json(user);
    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({ message: "Login error" });
    }
};

export const logOut = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        console.error("Logout Error:", err);
        return res.status(500).json({ message: "Logout error" });
    }
};