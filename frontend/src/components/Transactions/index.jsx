import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { IoIosSearch } from "react-icons/io";

import {formatCurrency} from '../../utils/formatters'
import {incomeCategories, expenseCategories} from '../../constants/categories'
import { useTransactions } from "../../context/TransactionsContext"


import Header from '../Header'
import ConfirmModal from "../../components/Modals/ConfirmModal";
import TransactionFormModal from "../../components/Modals/TransactionFormModal";

import './index.css'



const Transactions = () => {

    const navigate = useNavigate()

    const {
        transactions,
        filters,
        setFilters,
        page,
        setPage,
        totalPages,
        deleteTransaction,
        fetchTransactions
    } = useTransactions();

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedTransaction, setSelectedTransaction] = useState(null)

    useEffect(()=> {
        fetchTransactions()

    },[page, filters])

    const handleSearchClick = () => {
        setPage(1)
        fetchTransactions()
    }

    const handleFilterChange = (e) => {
        const { name, value } = e.target
        setFilters(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleDelete = (tx) => {
        setSelectedTransaction(tx)
        setShowDeleteModal(true)
    }

    const confirmDelete = async () => {
        if (!selectedTransaction) return;
        await deleteTransaction(selectedTransaction._id)
        setShowDeleteModal(false)
        setSelectedTransaction(null)

    }


    const handleEdit = (tx) => {
        setSelectedTransaction(tx)
        setShowEditModal(true)
    }


    return (
        <>
            <Header />
            <div className="transactions-page">
                <div className="title-add-btn-container">
                    <h2 className="transactions-title">Transactions</h2>
                    <button
                        className="add-btn"
                        onClick={() => navigate("/transactions/new")}
                    >
                        + Add Transaction
                    </button>
                </div>
                <hr className="section-divider" />
                
                {/* Filters */}
                <div className="filter-bar">

                    <div className="search-container">
                        <input
                            name="search"
                            placeholder="Search by title or notes..."
                            value={filters.search}
                            onChange={handleFilterChange}
                            className="search-input-field"
                        />
                        <button onClick={handleSearchClick} className="search-btn">
                            <IoIosSearch className="search-icon" />
                        </button>
                    </div>

                    <select
                        name="type"
                        value={filters.type}
                        onChange={(e)=> {
                            handleFilterChange(e)
                            setPage(1)
                            fetchTransactions()
                        }}
                    >
                        <option value="">All Types</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>

                    <select
                        name="category"
                        value={filters.category}
                        onChange={(e)=> {
                            handleFilterChange(e)
                            setPage(1)
                            fetchTransactions()
                        }}
                        disabled={!filters.type}
                    >
                        <option value="">All Categories</option>

                        {(filters.type === "income"
                            ? incomeCategories
                            : filters.type === "expense"
                            ? expenseCategories
                            : []
                        ).map(cat => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>

                    <input
                        type="date"
                        name="startDate"
                        value={filters.startDate}
                        onChange={handleFilterChange}
                    />

                    <input
                        type="date"
                        name="endDate"
                        value={filters.endDate}
                        onChange={handleFilterChange}
                    />

                    <button
                        onClick={() => {
                            setFilters({
                                search: "",
                                type: "",
                                category: "",
                                startDate: "",
                                endDate: ""
                            })
                            setPage(1)
                            fetchTransactions()
                        }}
                    >
                        Reset
                    </button>

                </div>

                {/* List */}
                {!transactions?.length ? (
                    <p className="empty-state">No transactions found.</p>
                ) : (
                    <div className="transactions-list">
                        {transactions.map((tx) => {
                            const isIncome = tx.type === "income";

                            return (
                            <div key={tx._id} className="transaction-row">

                                <div
                                    className="transaction-info"
                                    onClick={() => navigate(`/transactions/${tx._id}`)}
                                >
                                    <div className="row-left">
                                        <span className="row-title">{tx.title}</span>
                                        <span className="row-category">{tx.category}</span>
                                    </div>

                                    <div className="row-right">
                                        <span className={`row-amount ${isIncome ? "income" : "expense"}`}>
                                            {isIncome ? "+" : "-"}
                                            {formatCurrency(tx.amount)}
                                        </span>

                                        <span className="row-date">
                                            {new Date(tx.date).toLocaleDateString("en-IN", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>
                                </div>

                                <div className="row-actions">
                                    <button
                                        className="edit-btn"
                                        onClick={() => handleEdit(tx)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>handleDelete(tx)}
                                    >
                                        Delete
                                    </button>
                                </div>

                            </div>
                            );
                        })}
                    </div>

                )}
                {/* Pagination */}
                <div className="pagination">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((prev) => prev - 1)}
                    >
                        Prev
                    </button>
                    <span>
                        Page {page} of {totalPages}
                    </span>
                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage((prev) => prev + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Modals */}
            {showDeleteModal && (
            <ConfirmModal
                title="Delete Transaction"
                message="Are you sure you want to delete this transaction?"
                onCancel={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
            />
            )}
            {showEditModal && selectedTransaction && (
                <TransactionFormModal 
                    mode="edit"
                    transaction={selectedTransaction}
                    onClose={()=> {
                        setShowEditModal(false)
                        setSelectedTransaction(null)
                    }}
                    onSuccess={()=> {
                        setShowEditModal(false)
                        setSelectedTransaction(null)
                        fetchTransactions()
                    }}
                />
            )}
        </>
    )
}

export default Transactions