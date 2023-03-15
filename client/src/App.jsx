import { useState, useEffect } from 'react'
import Home from './pages/Home'
import EmployeeDetail from './pages/EmployeeDetail'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import Testing from './pages/Testing'

function App() {

  const [allEmployee, setAllEmployee] = useState()

  useEffect(() => {
    getAllEmployeesDetails()
  }, [])

  async function getAllEmployeesDetails() {
    const response = await fetch('https://tax-revenue.onrender.com/')
    const data = await response.json()
    setAllEmployee(data)
    console.log(data)
  }

  return (
    <div className="container mt-5">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home allEmployee={allEmployee} getAllEmployeesDetails={getAllEmployeesDetails} />} />
          <Route path='employee/:employeeId' element={allEmployee && <EmployeeDetail allEmployee={allEmployee} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
