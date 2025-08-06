import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Auth/Login.jsx"
import SignUp from "./pages/Auth/SignUp.jsx"
import Home from "./pages/Dashboard/Home.jsx"
import Income from "./pages/Dashboard/Income.jsx"
import Expense from "./pages/Dashboard/Expense.jsx"


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element ={<Root/>} />
          <Route path="/login" element ={<Login/>} />
          <Route path="/signup" element ={<SignUp/>} />
          <Route path="/dashboard" element ={<Home/>} />
          <Route path="/income" element ={<Income/>} />
          <Route path="/expense" element ={<Expense/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

const Root = () =>{
  // Check if token exists in localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  //Redirect to dashboard if authenticated, otherwise to login
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  )
}