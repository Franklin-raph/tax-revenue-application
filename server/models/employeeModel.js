const mongoose = require('mongoose')

const EmployeeSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    basicSalary: {
        type: Number,
        required: true
    },
    totalEarnings: {
        type: Number,
        default: 0
    }
},{timeStapms: true})

module.exports = mongoose.model('EmployeeModel', EmployeeSchema)