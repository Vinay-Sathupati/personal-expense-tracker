import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

import App from './App.jsx'

import './index.css'

import { AuthProvider } from './context/AuthContext.jsx'
import {TransactionsProvider} from './context/TransactionsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TransactionsProvider>
          <App />
          <ToastContainer position="top-center" hideProgressBar={true} autoClose={2000} newestOnTop/>
        </TransactionsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
