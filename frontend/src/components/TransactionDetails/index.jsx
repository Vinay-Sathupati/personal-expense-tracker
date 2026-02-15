import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import api from '../../api/api'
import { formatCurrency } from "../../utils/formatters"

import Header from "../../components/Header"
import ConfirmModal from "../../components/Modals/ConfirmModal"
import TransactionFormModal from "../../components/Modals/TransactionFormModal"

import './index.css'

const TransactionDetails  = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const [transaction, setTransaction] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    useEffect(() => {
        fetchTransaction()
    }, [id])

    const fetchTransaction = async () => {
        try {
            const res = await api.get(`/transactions/${id}`)
            setTransaction(res.data)
        } catch (err) {
            console.error(err)
            toast.error("Transaction not found")
            navigate("/transactions")
        } finally {
            setLoading(false)
        }
    }

    const confirmDelete = async () => {
        try {
            await api.delete(`/transactions/${id}`)
            toast.success("Transaction deleted")
            navigate("/transactions")
        } catch (err) {
            console.error(err)
            toast.error("Delete failed")
        }
    }

    if (loading) {
        return (
            <div className='loading-container'>
                <p>Loading...</p>
            </div>
        )
    }

    if (!transaction) return null

    const isIncome = transaction.type === "income"

    return (
        <>
            <Header />
            <div className="details-page">
                <div className="details-card">
                    <div className="btn-container">
                        <button
                            className="back-btn"
                            onClick={() => navigate(-1)}
                        >
                            ← Back
                        </button>
                    </div>
                    <h2 className="details-title">
                        {transaction.title}
                    </h2>

                    <p className={`details-amount ${isIncome ? "income" : "expense"}`}>
                        {isIncome ? "+" : "-"} {formatCurrency(transaction.amount)}
                    </p>

                    <div className="details-grid">
                        <div>
                            <span className="label">Type</span>
                            <span>{transaction.type}</span>
                        </div>

                        <div>
                            <span className="label">Category</span>
                            <span>{transaction.category}</span>
                        </div>

                        <div>
                            <span className="label">Date</span>
                            <span>
                                {new Date(transaction.date).toLocaleDateString("en-IN", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric"
                                })}
                            </span>
                        </div>
                    </div>

                    {transaction.notes && (
                        <div className="details-notes">
                            <span className="label">Notes</span>
                            <p>{transaction.notes}</p>
                        </div>
                    )}

                    <div className="details-actions">
                        <button
                            className="edit-btn"
                            onClick={() => setShowEditModal(true)}
                        >
                            Edit
                        </button>

                        <button
                            className="delete-btn"
                            onClick={() => setShowDeleteModal(true)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            {showDeleteModal && (
                <ConfirmModal
                    title="Delete Transaction"
                    message="Are you sure you want to delete this transaction?"
                    onCancel={() => setShowDeleteModal(false)}
                    onConfirm={confirmDelete}
                />
            )}

            {showEditModal && (
                <TransactionFormModal
                    mode="edit"
                    transaction={transaction}
                    onClose={() => setShowEditModal(false)}
                    onSuccess={() => {
                        setShowEditModal(false);
                        fetchTransaction();
                    }}
                />
            )}
        </>
    )
}

export default TransactionDetails