import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index:true},
    title: {type: String, required: true, trim: true},
    amount: {type: Number, required: true},
    type: {type: String, enum:["income", "expense"], required: true},
    category: {type: String, required: true},
    date: {type: Date, required: true},
    notes: {type: String, default:"N/A"}
}, {timestamps: true})

transactionSchema.index({user:1, date: -1})
transactionSchema.index({user:1, category: -1})

const Transaction = mongoose.model("Transaction", transactionSchema)

export default Transaction