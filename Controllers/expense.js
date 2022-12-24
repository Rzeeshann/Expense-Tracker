const Expense = require('../Models/expense')

exports.addExpense = (req,res,next) => {
    const {Amount,Description,Category} = req.body
    if(Amount == undefined || Amount.length === 0 
        || Description == undefined || Description.length === 0
        || Category == undefined || Category.length === 0)
        {
            return res.status(400).json({err:'Parameters Missing'})
        } else {
            Expense.create({Amount,Description,Category})
            .then(result=>{
                res.status(201).json({message:'Expense added',success:true})
            })
            .catch(err=>{
                res.status(500).json({err:'Something went wrong'})
            })
}
}

exports.showExpense = (req,res,next)=>{
    Expense.findAll()
    .then(expenses=>{
        res.status(200).json({data:expenses,success:true})
    })
}