
const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const app = express()


app.use(cors())

const sequelize = require('./Util/database')

app.use(bodyParser.json())

const userRoute = require('./Routes/user')

app.use('/users',userRoute)

const User = require("./Models/user")



sequelize.sync()
.then(res => {
    app.listen(5000)
})
.catch(err => {
    console.log(err);
})