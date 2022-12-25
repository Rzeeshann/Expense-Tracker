
const User = require('../Models/user')

const jwt = require('jsonwebtoken')

exports.authenticator = (req,res,next)=> {
    try{
const token = req.header('Authorization')
const user = jwt.verify(token,'secretkey')
console.log('REFERENCE', user.userId)
User.findByPk(user.userId)
.then(user=>{
    req.user = user
    next()
})
    }
    catch(err){
console.log(err)
return res.json({err,success:false})
    }
 
}

