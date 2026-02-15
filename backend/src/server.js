import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/authRoutes.js'
import transactionRoutes from './routes/transactionRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'

dotenv.config()

connectDB()

const app = express()
app.use(cookieParser())

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

app.use(express.json())

//health check
app.get("/", (req,res)=> {
    res.json({message: "API is running"})
})

app.use("/api/user", authRoutes)
app.use("/api/transactions", transactionRoutes)
app.use("/api/dashboard", dashboardRoutes)

//port
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})

