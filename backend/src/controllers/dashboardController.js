import Transaction from '../models/Transaction.js'

export const getSummary = async (req,res) => {
    try {
        const result = await Transaction.aggregate([
            {$match: {user: req.user._id}},
            {$group: {
                _id: "$type",
                total: {$sum: "$amount"}
                }
            }
        ])

        let totalIncome = 0
        let totalExpense = 0

        result.forEach((item) => {
            if (item._id === "income") totalIncome = item.total
            if (item._id === "expense") totalExpense = item.total 
        })

        res.status(200).json({totalIncome, totalExpense, netBalance: totalIncome - totalExpense})
    } catch (err) {
        console.error("Summary Error:", err.message)
        res.status(500).json({message: "Server error"})
    }
}

export const getExpensesCategoryBreakdown = async (req,res) => {
    try {
        const result = await Transaction.aggregate([
            {$match: {user: req.user._id, type: "expense"}},
            {
                $group: {
                    _id: "$category",
                    totalAmount: {$sum: "$amount"}
                }
            },
            {$sort: {totalAmount: -1}}
        ])

        res.status(200).json(result)
    } catch (err) {
        console.error("Category Breakdown Error:", err.message)
        res.status(500).json({message: "Server error"})
    }
}

export const getIncomeCategoryBreakdown = async (req,res) => {
    try {
        const result = await Transaction.aggregate([
            {$match: {user: req.user._id, type: "income"}},
            {
                $group: {
                    _id: "$category",
                    totalAmount: {$sum: "$amount"}
                }
            },
            {$sort: {totalAmount: -1}}
        ])

        res.status(200).json(result)
    } catch (err) {
        console.error("Category Breakdown Error:", err.message)
        res.status(500).json({message: "Server error"})
    }
}


export const getRecentTransactions = async (req,res) => {
    try {
        const transactions = await Transaction.find({user: req.user._id}).sort({date: -1}).limit(5)

        res.status(200).json(transactions)
    } catch (err) {
        console.error("Recent Transactions Error:", err.message)
        res.status(500).json({message: "Server error"})
    }
}


export const getMonthlyBreakdown = async (req,res) => {
    try {
        const result = await Transaction.aggregate([
            {
                $match: {user: req.user._id}
            },
            {
                $group:{
                    _id: {month: {$month: "$date"}, type: "$type"},
                    total: {$sum: "$amount"}
                }
            },
            {
                $sort: {"_id.month": 1}
            }
        ])

        res.status(200).json(result)
    } catch (err) {
        console.error("Monthly Breakdown Error:", err.message)
        res.status(500).json({message: "Server error"})
    }
}