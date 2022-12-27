
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

const purchaseRoute = require('./routes/purchase')

const leaderboardRoute = require('./Routes/leader')

const dotenv = require('dotenv')
dotenv.config();

app.use('/users',userRoute)

app.use('/expense',expenseRoute)

app.use(leaderboardRoute)

app.use(purchaseRoute)


const User = require('./Models/user')

const Expense = require('./Models/expense')

const Order = require('./Models/order')

const Premium = require('./Models/premiummembership')

User.hasMany(Expense)
Expense.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

sequelize.sync()
.then(user => {
    app.listen(5000)
})
.catch(err => {
    console.log(err);
})