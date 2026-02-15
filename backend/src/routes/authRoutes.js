import express from 'express'
import { registerUser, loginUser, getUser, logoutUser } from '../controllers/authController.js'
import auth from '../middleware/authMiddleware.js'

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/me", auth, getUser)
router.post("/logout", logoutUser)

export default router