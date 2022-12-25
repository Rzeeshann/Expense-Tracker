
const express = require('express');

const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');

const cors = require('cors');

const app = express()


app.use(cors())

const sequelize = require('./Util/database')

app.use(bodyParser.json())

const userRoute = require('./Routes/user')

const expenseRoute = require('./Routes/expense')


app.use('/users',userRoute)

app.use('/expense',expenseRoute)


const User = require('./Models/user')

const Expense = require('./Models/expense')

User.hasMany(Expense)
Expense.belongsTo(User)

sequelize.sync()
.then(user => {
    app.listen(5000)
})
.catch(err => {
    console.log(err);
})