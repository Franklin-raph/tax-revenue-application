import { useState, useEffect } from 'react'
import Home from './pages/Home'
import EmployeeDetail from './pages/EmployeeDetail'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'

function App() {

  const [allEmployee, setAllEmployee] = useState()

  useEffect(() => {
    getAllEmployeesDetails()
  }, [])

  async function getAllEmployeesDetails() {
    const response = await fetch('http://localhost:8000/all-employee/')
    const data = await response.json()
    setAllEmployee(data)
    console.log(data)
  }

  return (
    <div className="container mt-5">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={allEmployee && <Home allEmployee={allEmployee} />} />
          <Route path='employee/:employeeId' element={allEmployee && <EmployeeDetail allEmployee={allEmployee} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
