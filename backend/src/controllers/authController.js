import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//Register new user
export const registerUser = async (req,res) => {
    try {
        const {name, email, password} = req.body

        if (!name || !email || !password) {
            return res.status(400).json({message: "All fields are required"})
        }

        const userExists = await User.findOne({email})
        if (userExists) {
            return res.status(400).json({message: "User already exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        res.status(201).json({id: user._id, name: user.name, email: user.email})
    } catch (err) {
        console.error("Register Error:", err.message)
        res.status(500).json({message: "Server error"})
    }
}


//Login user
export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body

        if (!email || !password) {
            return res.status(400).json({message: "Email and Password required"})
        }

        const user = await User.findOne({email})

        if (!user) {
            return res.status(401).json({message: "User not exists"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).json({message: "Invalid credentials"})
        }

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})

        const isProd = process.env.NODE_ENV === 'production'
        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "none" : "lax",
            maxAge: 7 *24 * 60 * 60 * 1000
        })

        res.status(200).json({message: "login success"})
    } catch (err) {
        console.error("Login error:", err.message)
        res.status(500).json({message: "Server error"})
    }
}


//Get user Details
export const getUser = async (req,res) => {
    try {
        res.status(200).json(req.user)
    } catch (err) {
        res.status(500).json({message: "Server error"})
    }
}

//Logout user
export const logoutUser = async (req,res) => {
    
    const isProd = process.env.NODE_ENV === 'production'
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax"
    })

    res.json({message: "Logged out successfully"})
}