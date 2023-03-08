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
    const [basicSalary, setBasicSalary] = useState()
    const [totalEarnings, setTotalEarnings] = useState()

    useEffect(() => {
        getEmployeesDetails()
    }, [])

    async function getEmployeesDetails() {
        const response = await fetch(`http://localhost:8000/employee/${employeeId}`)
        const data = await response.json()
        if (response.ok) {
            setFirstName(data.firstName)
            setLastName(data.firstName)
            setEmail(data.email)
            setSalary(data.salary)
            setPhone(data.phone)
            setBasicSalary(data.basicSalary)
            setTotalEarnings(data.totalEarnings)
        }
        setEmployee(data)
        console.log(data.totalEarnings)
    }


    async function paySalary() {
        let amountToBeDeducted = 0.1 * basicSalary
        let totalAmount = (totalEarnings + basicSalary) - amountToBeDeducted
        const response = await fetch(`http://localhost:8000/employee/${employeeId}`, {
            method: "PUT",
            body: JSON.stringify({ ...employee, totalEarnings: totalAmount }),
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

    return (
        <div>
            {employee &&
                <>
                    <h5 className='my-3'>Employee First Name: {employee.firstName}</h5>
                    <h5 className='my-3'>Employee Last Name: {employee.lastName}</h5>
                    <h5 className='my-3'>Employee Email: {employee.email}</h5>
                    <h5 className='my-3'>Employee Phone Number: {employee.phone}</h5>
                    <h5 className='my-3'>Employee Salary: {employee.basicSalary}</h5>
                    <button onClick={paySalary}>Pay Salary</button>
                </>
            }

        </div>
    )
}

export default EmployeeDetail