import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const EmployeeDetail = () => {
    const navigate = useNavigate()
    const { employeeId } = useParams()

    const [employee, setEmployee] = useState()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [salary, setSalary] = useState("")
    const [phone, setPhone] = useState("")
    const [dapartment, setDapartment] = useState("")
    const [basicSalary, setBasicSalary] = useState()
    const [totalEarnings, setTotalEarnings] = useState()
    const [totalTaxPaid, setTotalTaxPaid] = useState()

    useEffect(() => {
        getEmployeesDetails()
    }, [])

    async function getEmployeesDetails() {
        const response = await fetch(`https://tax-revenue.onrender.com/${employeeId}`)
        const data = await response.json()
        if (response.ok) {
            setFirstName(data.firstName)
            setLastName(data.firstName)
            setEmail(data.email)
            setSalary(data.salary)
            setPhone(data.phone)
            setBasicSalary(data.basicSalary)
            setTotalEarnings(data.totalEarnings)
            setTotalTaxPaid(data.totalTaxPaid)
            setDapartment(data.dapartment)
        }
        setEmployee(data)
        console.log(data)
    }


    async function paySalary() {
        let amountToBeDeducted = 0.1 * basicSalary
        let taxPaid = totalTaxPaid + amountToBeDeducted
        let totalAmount = (totalEarnings + basicSalary) - amountToBeDeducted
        const response = await fetch(`https://tax-revenue.onrender.com/${employeeId}`, {
            method: "PUT",
            body: JSON.stringify({ ...employee, totalEarnings: totalAmount, totalTaxPaid: taxPaid }),
            headers: {
                "Content-type": 'application/json'
            }
        })
        if (response.ok) {
            navigate('/')
            location.reload()
        }
        const data = await response.json()
        // setEmployee(data)
    }

    async function deleteEmployee() {
        const res = await fetch('https://tax-revenue.onrender.com/' + employeeId, {
            method: "DELETE"
        })
        if (res.ok) {
            navigate('/')
        }
    }

    return (
        <div>
            {employee &&
                <>
                    <div className="d-flex justify-content-center align-items-center gap-5 my-3">
                        <div className="d-flex flex-column justify-content-center align-items-center gap-2 my-3">
                            <h5>Employees Basic Salary</h5>
                            <h5 style={{ backgroundColor: "#91B1D2", padding: "20px" }}>
                                {(new Intl.NumberFormat('en-us', {
                                    style: 'currency',
                                    currency: "NGN"
                                })).format(employee.basicSalary)}
                            </h5>
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-center gap-2 my-3">
                            <h5>Employees Total Earnings</h5>
                            <h5 style={{ backgroundColor: "#91B1D2", padding: "20px" }}>{(new Intl.NumberFormat('en-us', {
                                style: 'currency',
                                currency: "NGN"
                            })).format(employee.totalEarnings)}</h5>
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-center gap-2 my-3">
                            <h5>Total Tax Paid By Employee</h5>
                            <h5 style={{ backgroundColor: "#91B1D2", padding: "20px" }}>{(new Intl.NumberFormat('en-us', {
                                style: 'currency',
                                currency: "NGN"
                            })).format(employee.totalTaxPaid)}</h5>
                        </div>
                    </div>
                    <small className='d-block text-center mb-5'>(NOTE: On each employees salary payment, 10% of an employees basic salary is being deducted for tax.)</small>
                    <h5 className='my-3'>Employee First Name: {employee.firstName}</h5>
                    <h5 className='my-3'>Employee Last Name: {employee.lastName}</h5>
                    <h5 className='my-3'>Employee Department: {dapartment}</h5>
                    <h5 className='my-3'>Employee Email: {employee.email}</h5>
                    <h5 className='my-3'>Employee Phone Number: {employee.phone}</h5>

                    <button className='btn btn-secondary' onClick={() => navigate("/")}>Home</button>
                    <button className='btn btn-success mx-4' onClick={paySalary}>Pay Salary</button>
                    <button className='btn btn-danger' onClick={deleteEmployee}>Delete Employee</button>
                </>
            }

        </div>
    )
}

export default EmployeeDetail