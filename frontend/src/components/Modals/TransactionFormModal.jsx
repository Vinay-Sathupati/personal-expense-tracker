import { useState, useEffect } from "react"
import api from "../../api/api"
import { incomeCategories, expenseCategories } from "../../constants/categories"

import './index.css'

const TransactionFormModal = ({
    mode = "create",
    transaction = null,
    onClose,
    onSuccess
}) => {
    

    const [form,setForm] = useState({
        title: "",
        amount: "",
        type: "expense",
        category: "",
        date: "",
        notes: ""
    })

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (mode === "edit" && transaction) {
            setForm({
                title: transaction.title,
                amount: transaction.amount,
                type: transaction.type,
                category: transaction.category,
                date: transaction.date?.split("T")[0],
                notes: transaction.notes || ""
            });
        }
    }, [mode, transaction])

    const handleChange = (e) => {
        const { name, value } = e.target

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

        try {
            setLoading(true);

            if (mode === "edit") {
                await api.put(`/transactions/${transaction._id}`, form)
            } else {
                await api.post("/transactions", form)
            }

            onSuccess && onSuccess()
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="form-modal" onClick={(e)=> e.stopPropagation()}>
                <h3 className="form-title">
                    {mode === "edit" ? "Edit Transaction" : "Add Transaction"}
                </h3>
                <form onSubmit={handleSubmit} className="form-body">
                    <div className="form-group">
                        <input
                            id="title"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                            placeholder=" "
                            className="input-field"
                        />
                        <label htmlFor="title" className="input-label">Title</label>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <input
                                id="amount"
                                type="number"
                                name="amount"
                                value={form.amount}
                                onChange={handleChange}
                                required
                                placeholder=" "
                                className="input-field"
                            />
                            <label htmlFor="amount" className="input-label">Amount</label>
                        </div>

                        <div className="form-group">
                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                required
                                className="date-input-field"
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <select
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                                className="input-field"
                            >
                                <option value="">Select Type</option>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>
                        <div className="form-group">
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
                                ).map(cat => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        
                        <textarea
                            id="notes"
                            name="notes"
                            value={form.notes}
                            onChange={handleChange}
                            placeholder=" "
                            className="input-text-field"
                        />
                        <label htmlFor="notes" className="input-label">Notes (Optional)</label>
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="save-btn"
                            disabled={loading}
                        >
                            {loading
                                ? "Saving..."
                                : mode === "edit"
                                ? "Update"
                                : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default TransactionFormModal