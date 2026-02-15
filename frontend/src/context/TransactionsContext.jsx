import { createContext, useContext, useState } from "react"
import api from '../api/api'
import {toast} from 'react-toastify'

const TransactionsContext = createContext()

export const TransactionsProvider = ({children}) => {
    const [transactions, setTransactions] = useState([])
    const [filters, setFilters] = useState({
        search: "",
        type: "",
        category: "",
        startDate: "",
        endDate: ""
    })

    const [page,setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const fetchTransactions = async () => {
        try {
            const params = {
                page,
                limit:8,
                ...filters
            }

            const res = await api.get("/transactions", {params})

            setTransactions(res.data.transactions || [])
            setTotalPages(res.data.pages || 1)
        } catch (err) {
            console.error(err)
        }
    }

    const deleteTransaction = async (id) => {
        try {
            await api.delete(`/transactions/${id}`)
            toast.success("Transaction Deleted.")
            fetchTransactions()
        } catch (err) {
            console.error(err)
            toast.error("Something went wrong. Please try again.")
        }
    }


    return (
        <TransactionsContext.Provider
            value={{
                transactions,
                filters,
                setFilters,
                page,
                setPage,
                totalPages,
                deleteTransaction,
                fetchTransactions
            }}
        >
            {children}
        </TransactionsContext.Provider>
    )
}


export const useTransactions = () => useContext(TransactionsContext)