import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = ({ allEmployee, getAllEmployeesDetails }) => {
    const navigate = useNavigate()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [basicSalary, setBasicSalary] = useState("")

    useEffect(() => {
        getAllEmployeesDetails()
    }, [])

    async function addEmployee(e) {
        e.preventDefault()
        const res = await fetch("http://localhost:5000/register-employee", {
            method: "POST",
            body: JSON.stringify({ firstName, lastName, phone, email, basicSalary }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        console.log(res)
        const data = await res.json()
        if (!res.ok) {
            alert(data.err)
        }
        if (res.ok) {
            alert("Employee added successfully")
            location.reload()
        }
    }

    return (
        <div className="container mt-5">
            <h3 className='my-5 text-center'>Employees Details</h3>
            <div className='text-end my-3'>
                <div className="btn btn-success" data-bs-toggle="modal" data-bs-target="#employeeModal">+ Add Employee</div>
            </div>
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
                            <td>{(new Intl.NumberFormat('en-us', {
                                style: 'currency',
                                currency: "NGN"
                            })).format(employee.basicSalary)}</td>
                            <td>{(new Intl.NumberFormat('en-us', {
                                style: 'currency',
                                currency: "NGN"
                            })).format(employee.totalEarnings)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="modal fade" id="employeeModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <form onSubmit={addEmployee} className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">New Employee</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">First Name</label>
                                    <input required onChange={e => setFirstName(e.target.value)} type="text" className="form-control" id="recipient-name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Last Name</label>
                                    <input required onChange={e => setLastName(e.target.value)} type="text" className="form-control" id="recipient-name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Email</label>
                                    <input required type="email" onChange={e => setEmail(e.target.value)} className="form-control" id="recipient-name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Phone Number</label>
                                    <input required onChange={e => setPhone(e.target.value)} type="number" className="form-control" id="recipient-name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Basic Salary</label>
                                    <input required onChange={e => setBasicSalary(e.target.value)} type="number" className="form-control" id="recipient-name" />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <input type="submit" className="btn btn-primary" value="Register Employee" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Home