import express from 'express'
import { getSummary, getExpensesCategoryBreakdown, getIncomeCategoryBreakdown, getRecentTransactions, getMonthlyBreakdown } from '../controllers/dashboardController.js'
import auth from '../middleware/authMiddleware.js'


const router = express.Router()

router.get("/summary", auth, getSummary)
router.get("/category-breakdown/expense", auth, getExpensesCategoryBreakdown)
router.get("/category-breakdown/income", auth, getIncomeCategoryBreakdown)
router.get("/monthly-breakdown",auth, getMonthlyBreakdown)
router.get("/recent", auth, getRecentTransactions)

export default router