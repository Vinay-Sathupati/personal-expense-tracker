import { useState, useEffect } from 'react'
import api from '../../api/api'


import {PieChart, Pie, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import { BarChart,Bar, XAxis, YAxis, CartesianGrid } from 'recharts'

import {formatCurrency} from '../../utils/formatters'
import { prepareDonutData, prepareMonthlyBarData } from '../../utils/dashboardUtils'
import {expenseBaseColor, incomeBaseColor} from '../../utils/colorUtils'

import Header from '../Header'
import { toast } from 'react-toastify'

import './index.css'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

    const navigate = useNavigate()

    const [summary, setSummary] = useState(null)
    const [expenseCategories, setExpenseCategories] = useState([])
    const [incomeCategories, setIncomeCategories] = useState([])
    const [recent, setRecent] = useState([])
    const [monthly, setMonthly] = useState([])
    

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const [summaryRes, expenseCategoryRes, incomeCategoryRes, recentRes, monthlyRes] = await Promise.all([
                    api.get("/dashboard/summary"),
                    api.get("/dashboard/category-breakdown/expense"),
                    api.get("/dashboard/category-breakdown/income"),
                    api.get("/dashboard/recent"),
                    api.get("/dashboard/monthly-breakdown")
                ])

                setSummary(summaryRes.data)
                setExpenseCategories(expenseCategoryRes.data)
                setIncomeCategories(incomeCategoryRes.data)
                setRecent(recentRes.data)
                setMonthly(monthlyRes.data)
            } catch (err) {
                toast.error(err?.response?.data?.message)
                console.error(err)
            }
        }

        fetchData()
    },[])

    //Expenses Donut Chart
    const expenseDonutData = prepareDonutData(expenseCategories, expenseBaseColor)

    //Income Donut Chart
    const incomeDonutData = prepareDonutData(incomeCategories, incomeBaseColor)

    //Monthly Breakdown Bar Chart
    const barData = prepareMonthlyBarData(monthly)

    if (!summary) {
        return (
            <div className='loading-container'>
                <p>Loading Dashboard...</p>
            </div>
        )
    }

    return (
        <div>
            <Header />
            <div className='dashboard-main-container'>
                <div className="title-add-btn-container">
                    <h2 className='dashboard-title'>Dashboard</h2>
                    <button
                        className="add-btn"
                        onClick={() => navigate("/transactions/new")}
                    >
                        + Add Transaction
                    </button>
                </div>
                <div className='dashboard-grid'>
                    <div className='summary-section'>
                        <div className='summary-income'>
                            <h4>Total Income</h4>
                            <p>{formatCurrency(summary.totalIncome)}</p>
                        </div>
                        <div className='summary-expense'>
                            <h4>Total Expense</h4>
                            <p>{formatCurrency(summary.totalExpense)}</p>
                        </div>
                        <div className='summary-net'>
                            <h4>Current Balance</h4>
                            <p>{formatCurrency(summary.netBalance)}</p>
                        </div>
                    </div>
                    {expenseDonutData?.length > 0 ?
                    (<div className='expense-donut-section'>
                        <h4>Expense Distribution</h4>
                        <div>
                            <ResponsiveContainer width="100%" height={350}>
                                <PieChart>
                                    <Pie
                                        data = {expenseDonutData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="40%"
                                        cy="50%"
                                        innerRadius={75}
                                        outerRadius={115}
                                        paddingAngle={4}
                                        label={false}
                                        isAnimationActive={true}
                                        animationDuration={800}
                                    />
                                    <Tooltip formatter={(value)=> formatCurrency(value)} />
                                    <Legend
                                        layout='vertical'
                                        verticalAlign='middle'
                                        align='right'
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>) : (<p>No expense data available</p>)}
                    {incomeDonutData?.length > 0 ?
                    (<div className='income-donut-section'>
                        <h4>Income Sources</h4>
                        <div>
                            <ResponsiveContainer width="100%" height={350}>
                                <PieChart>
                                    <Pie
                                        data = {incomeDonutData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="40%"
                                        cy="50%"
                                        innerRadius={75}
                                        outerRadius={115}
                                        paddingAngle={4}
                                        label={false}
                                        isAnimationActive={true}
                                        animationDuration={800}
                                    />
                                    <Tooltip formatter={(value)=> formatCurrency(value)} />
                                    <Legend
                                        layout='vertical'
                                        verticalAlign='middle'
                                        align='right'
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>) : (<p>No income data available</p>)}
                    <div className='recent-section'>
                        <h4>Recent Activity</h4>
                        {recent.map((txt) =>{
                            const isIncome = txt.type === "income"
                            return (
                            <div key={txt._id} className={`recent-item ${isIncome ? "income" : "expense"}`}>
                                <div className='recent-left'>
                                    <p className='recent-title'>{txt.title}</p>
                                    <span className='recent-category'>{txt.category}</span>
                                </div>
                                <div className='recent-right'>
                                    <span className='recent-amount'>
                                        {isIncome ? "+" : "-"}
                                        {formatCurrency(txt.amount)}
                                    </span>
                                </div>
                            </div>
                        )})}
                    </div>
                    {barData?.length > 0 ?
                    (<div className='bar-section'>
                        <h4>Monthly Income vs Expenses</h4>
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <YAxis tickFormatter={(value) => `${value / 1000}k`} />
                                <XAxis dataKey="month" />
                                <Tooltip formatter={(value)=> formatCurrency(value)} />
                                <Bar dataKey="income" fill='#16a34a' radius={[4, 4, 0, 0]} />
                                <Bar dataKey="expense" fill='#e11d48' radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>) : (<p>No expense data available</p>)}
                
                </div>
            </div>
        </div>
    )
}

export default Dashboard