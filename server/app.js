const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const EmployeeModel = require('./models/employeeModel')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

PORT = process.env.PORT || 8000

// connect to mongoDB
mongoose.connect('mongodb://127.0.0.1/tax-revenue-app-dev')
  .then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT} \nMongo Db is connected`)
    })
  }).catch((err) => console.log(err))


app.get('/all-employee', async (req, res) => {
    try {
        const allEmployees = await EmployeeModel.find().sort({createdAt: -1})
        return res.status(200).json(allEmployees)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})


app.get('/employee/:employeeId', async (req, res) => {
    const { employeeId } = req.params
    try {
        const employee = await EmployeeModel.findById(employeeId)
        return res.status(200).json(employee)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})


app.put('/employee/:employeeId', (req, res) => {
    const { employeeId } = req.params
    console.log(employeeId)
    try {

        EmployeeModel.findById(req.params.employeeId)
        .then(result =>{
            result.firstName = req.body.firstName;
            result.lastName = req.body.lastName;
            result.email = req.body.email;
            result.phone = req.body.phone;
            result.salary = req.body.salary;
            result.totalEarnings = req.body.totalEarnings;

            result.save()
                .then(result => {
                    return res.status(200).json(result)
                })
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})


app.delete('/delete-employee/:employeeId', async (req, res) => {
    const { employeeId } = req.params
    try {
        await EmployeeModel.findByIdAndDelete(employeeId)
        return res.status(200).json({err: "Employee data deleted successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})


app.post('/register-employee', async (req, res) => {
    const {firstName, lastName, phone, email, totalEarnings, basicSalary} = req.body;
    try {

        let employeeEmail = await EmployeeModel.findOne({email})
        if(employeeEmail) return res.status(400).json({err:"Employee with this email already exists"})

        const employee = await EmployeeModel.create({
            firstName, lastName, phone, email, basicSalary, totalEarnings
        })
    
        return res.status(201).json(employee)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})