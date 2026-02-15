import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../api/api"
import { incomeCategories, expenseCategories } from "../../constants/categories"
import { toast } from "react-toastify"

import Header from "../Header"

import "./index.css"

const NewTransaction = () => {
    const navigate = useNavigate()

    const [form, setForm] = useState({
        title: "",
        amount: "",
        type: "expense",
        category: "",
        date: "",
        notes: ""
    })

    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm(prev => {
        if (name === "type") {
            return {
            ...prev,
            type: value,
            category: "" 
            };
        }
        return { ...prev, [name]: value }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!form.title || !form.amount || !form.category || !form.date) {
            toast.error("Please fill all required fields");
            return
        }

        try {
            setLoading(true)

            await api.post("/transactions", form)

            toast.success("Transaction added successfully")

            navigate("/transactions")

        } catch (err) {
            toast.error(err?.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Header />
            <div className="new-transactions-page">
                <h2 className="page-title">Add New Transaction</h2>
                <form onSubmit={handleSubmit} className="transaction-form">

                        <div className="input-container">
                            <input
                                id="title"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder=" "
                                required
                                className="input-field"
                            />
                            <label htmlFor="title" className='input-label'>Title</label>
                        </div>

                        <div className="amount-date-container">
                            <div className="input-container">
                                <input
                                    id="amount"
                                    name="amount"
                                    type="number"
                                    value={form.amount}
                                    onChange={handleChange}
                                    placeholder=" "
                                    required
                                    className="input-field"
                                />
                                <label htmlFor="amount" className='input-label'>Amount</label>
                            </div>
                            <div className="input-container">
                                <input
                                    name="date"
                                    type="date"
                                    value={form.date}
                                    onChange={handleChange}
                                    required
                                    className="date-input-field"
                                />
                                
                            </div>
                        </div>

                        
                        <div className="type-category-container">
                            <select
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                                className="input-field"
                            >
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                            
                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                required
                                className="input-field"
                            >
                                <option value="">Select Category</option>
                                {(form.type === "income"
                                    ? incomeCategories
                                    : expenseCategories
                                ).map((cat) => (
                                    <option key={cat} value={cat}>
                                    {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="input-container">
                            <textarea
                                id="notes"
                                name="notes"
                                value={form.notes}
                                onChange={handleChange}
                                placeholder=" "
                                className="input-text-field"
                            />
                            <label htmlFor="notes" className='input-label'>Notes</label>
                        </div>

                        <div className="modal-actions">
                        <button type="button" className="cancel-btn" onClick={() => navigate("/transactions")}>
                            Cancel
                        </button>
                        <button type="submit" className="save-btn" disabled={loading}>{loading ? "Adding..." : "Add Transaction"}</button>
                        </div>

                    </form>
            </div>
        </>
    )
}

export default NewTransaction