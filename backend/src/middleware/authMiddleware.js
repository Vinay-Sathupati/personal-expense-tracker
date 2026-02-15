import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const auth = async (req,res,next) => {
    const token = req.cookies?.['accessToken']
    if (!token) {
        return res.status(401).json({message: "Access denied. Not Authenticated."})
    }

    let decoded
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.id).select("-password")
        if (!user) {
            return res.status(401).json({message: "Invalid session"})
        }

        req.user = user
        next()
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token Expired. Please log in again.",
                expired: true
            })
        }

        res.status(401).json({message: "Unauthorized."})
    }
}

export default auth