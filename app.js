
const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const app = express()


app.use(cors())

const sequelize = require('./Util/database')

app.use(bodyParser.json())

const userRoute = require('./Routes/user')

const expenseRoute = require('./Routes/expense')

const userTable = require('./Models/user')

const expenseTable = require('./Models/expense')

app.use('/users',userRoute)

app.use('/expense',expenseRoute)


const User = require("./Models/user")



sequelize.sync()
.then(res => {
    app.listen(5000)
})
.catch(err => {
    console.log(err);
})