import Transaction from "../models/Transaction.js";

//Create transaction
export const createTransaction = async (req,res) => {
    try {
        const {title, amount, type, category, date, notes} = req.body
        if (!title || !amount || !category || !date) {
            return res.status(400).json({message: "Required fields missing."})
        }

        if (!["income", "expense"].includes(type)) {
            return res.status(400).json({message: "Invalid transaction type"})
        }

        const transaction = await Transaction.create({
            user: req.user._id,
            title,
            amount,
            type,
            category,
            date,
            notes
        })

        res.status(201).json({message: "transaction created.", transaction})
    } catch (err) {
        console.error("Create Transaction Error:", err.message)
        res.status(500).json({message: "Server error"})
    }
}

//Get transactions with filter and pagination
export const getTransactions = async (req,res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search,
            type,
            category,
            startDate,
            endDate,
            minAmount,
            maxAmount
        } = req.query

        const query = {user: req.user._id}

        if (search) {
            query.$or = [
                {title: {$regex: search, $options: "i"}},
                {notes: {$regex: search, $options: "i"}}
            ]
        }

        if (type) {
            query.type = type
        }

        if (category) {
            query.category = category
        }

        if (startDate || endDate) {
            query.date = {}
            if (startDate) {
                query.date.$gte = new Date(startDate)
            }
            if (endDate) {
                query.date.$lte = new Date(endDate)
            }
        }

        if (minAmount || maxAmount) {
            query.amount = {}
            if (minAmount) {
                query.amount.$gte = Number(minAmount)
            }
            if (maxAmount) {
                query.amount.$lte = Number(maxAmount)
            }
        }

        const skip = (page-1) * Number(limit)

        const transactions = await Transaction.find(query).sort({date:-1}).skip(skip).limit(Number(limit))
        

        const total = await Transaction.countDocuments(query)

        res.status(200).json({total, page: Number(page), pages: Math.ceil(total/limit), transactions})
    } catch (err) {
            console.error("Get Transactions Error:", err.message)
            res.status(500).json({message: "Server error"})
    }
}


//Get single transaction
export const getTransactionById = async (req,res) => {
    try {
        const transaction = await Transaction.findOne({
            _id: req.params.id,
            user: req.user._id
        })

        if (!transaction) {
            return res.status(404).json({message: "Transaction not found"})
        }

        res.status(200).json(transaction)
    } catch (err) {
        console.error("Get Transaction Error:", err.message)
        res.status(500).json({message: "Server error"})
    }
}

//Update transaction
export const updateTransaction = async (req,res) => {
    try {
        const transaction = await Transaction.findOne({_id: req.params.id, user:req.user._id})
        if (!transaction) {
            return res.status(404).json({message: "Transaction not found"})
        }

        const {title, amount, type, category, date, notes} = req.body
        
        transaction.title = title ?? transaction.title
        transaction.amount = amount ?? transaction.amount
        transaction.type = type ?? transaction.type
        transaction.category = category ?? transaction.category
        transaction.date = date ?? transaction.date
        transaction.notes = notes ?? transaction.notes

        const updated = await transaction.save()

        res.status(200).json(updated)
    } catch (err) {
        console.error("Update Transaction Error:", err.message)
        res.status(500).json({message: "Server error"})
    }
}

//Delete transaction
export const deleteTransaction = async (req,res) => {
    try {
        const transaction = await Transaction.findOne({
            _id: req.params.id,
            user: req.user._id
        })

        if (!transaction) {
            return res.status(404).json({message: "Transaction not found"})
        }

        await transaction.deleteOne()

        res.status(200).json({message: "Transaction deleted successfully."})
    } catch (err) {
        console.error("Delete Transaction Error:", err.message)
        res.status(500).json({message: "Server error"})
    }
}