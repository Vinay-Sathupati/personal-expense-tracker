import express from 'express'
import {createTransaction, deleteTransaction, getTransactionById, getTransactions, updateTransaction} from '../controllers/transactionController.js'
import auth from '../middleware/authMiddleware.js'

const router = express.Router()

router.post("/", auth, createTransaction)
router.get("/", auth, getTransactions)
router.get("/:id", auth, getTransactionById)
router.put("/:id", auth, updateTransaction)
router.delete("/:id", auth, deleteTransaction)

export default router