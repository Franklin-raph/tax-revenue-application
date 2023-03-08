import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = ({ allEmployee }) => {
    const navigate = useNavigate()

    return (
        <div className="container mt-5">
            <h3 className='my-5 text-center'>Employees Details</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Basic Salary</th>
                        <th>Total Earnings</th>
                    </tr>
                </thead>

                <tbody>
                    {allEmployee && allEmployee.map(employee => (
                        <tr className='tr' key={employee._id} onClick={() => navigate(`employee/${employee._id}`)}>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phone}</td>
                            <td>{employee.basicSalary}</td>
                            <td>{employee.totalEarnings}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}

export default Home