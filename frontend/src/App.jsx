import {Routes, Navigate} from 'react-router-dom'

import './App.css'

import Login from './components/LoginAndRegister/Login'
import Register from './components/LoginAndRegister/Register'
import Dashboard from './components/Dashboard'
import Transactions from './components/Transactions'
import TransactionDetails from './components/TransactionDetails'
import NewTransaction from './components/NewTransaction'
import NotFound from './components/NotFound'

import ProtectedRoute from './components/ProtectedRoute'
import { Route } from 'react-router-dom'


const App = () => {


  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/transactions" 
        element={
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/transactions/new" 
        element={
          <ProtectedRoute>
            <NewTransaction />
          </ProtectedRoute>} 
      />
      
      <Route 
        path="/transactions/:id" 
        element={
          <ProtectedRoute>
            <TransactionDetails />
          </ProtectedRoute>
        } />

      <Route path='/not-found' element={<NotFound />} />
      <Route path='*' element={<Navigate to="/not-found" />} />
    </Routes>
  )
}

export default App