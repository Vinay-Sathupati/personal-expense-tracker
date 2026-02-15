# 💰 Personal Finance Management Application

A full-stack Personal Finance Management application built using **React, Node.js, Express, and MongoDB**.  
This application helps users track income and expenses, analyze spending patterns, and manage financial data efficiently with interactive dashboards and filtering capabilities.

## 🏗 Tech Stack

### Frontend
- React
- React Router
- Context API (Global state management)
- Recharts (Data visualization)
- React Toastify (Notifications)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

## 📂 Project Structure

```
PERSONAL-EXPENSE-TRACKER/
│
├── backend/
│ ├── node_modules/
│ ├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.http
│   └── server.js
│ 
├── frontend/
│ |
│ |
│ ├── src/
│   ├── api/
│   ├── assets/
│   │ └── lottie-animations/
│   │ 
│   ├── components/
│   │ ├── Dashboard/
│   │ ├── Header/
│   │ ├── LoginAndRegister/
│   │ ├── Modals/
│   │ ├── NewTransaction/
│   │ ├── NotFound/
│   │ ├── ProtectedRoute/
│   │ ├── TransactionDetails/
│   │ └── Transactions/
│   ├── constants/
│   ├── context/
│   ├── utils/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│ 
└── README.md
```

## 🚀 Features

### 🔐 Authentication
- JWT-based authentication
- Secure login and registration
- Protected routes

### 📊 Dashboard
- Total Income, Total Expense, and Net Balance summary cards
- Donut charts for:
  - Expense category breakdown
  - Income category breakdown
- Monthly bar chart comparing Income vs Expense
- Recent transactions overview

### 💳 Transactions Management
- Add new transactions
- Edit transactions (via reusable modal)
- Delete transactions (with confirmation modal)
- View detailed transaction page
- Pagination support
- Search (triggered on button click to avoid unnecessary API calls)
- Filters:
  - Type (Income / Expense)
  - Category (Dynamic based on type)
  - Date range

### 🧠 Smart Backend Features
- MongoDB aggregation pipelines for:
  - Summary calculations
  - Category breakdown
  - Monthly income vs expense
- Filtering and pagination at database level
- Clean controller and route separation
