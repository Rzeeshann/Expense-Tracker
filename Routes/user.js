const userController =  require("../Controllers/user")

const express = require('express')

const router = express.Router()

router.post('/signup',userController.signup)

router.post('/login', userController.login)

module.exports = router