import React from 'react'
import { BrowserRouter as Router , Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Income from './pages/Dashboard/Income'
import Expense from './pages/Dashboard/Expense'
import Home from './pages/Dashboard/Home'
import { UserProvider } from './context/userContext'
import { Toaster } from 'react-hot-toast'
const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="/dashboard" exact element={<Home />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense/>} />
          </Routes>
        </Router>
      </div>

      <Toaster  
        className="toast-position"
        style={{
          fontSize: '13px',
        }}

      />
    </UserProvider>
  )
}

export default App

const Root = () => {
  // Check if the user is authenticated
  const isAuthenticated = !!localStorage.getItem('token');
  // Redirect to the login page if not authenticated
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
}