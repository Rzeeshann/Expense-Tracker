const Expense = require('../Models/expense')
const User = require('../Models/user')


exports.addExpense = (req,res,next) => {
    const {Amount,Description,Category} = req.body
    console.log(req.body);
    if(Amount == undefined || Amount.length === 0 
        || Description == undefined || Description.length === 0
        || Category == undefined || Category.length === 0)
        {
            return res.status(400).json({err:'Parameters Missing'})
        } else {
            Expense.create({Amount,Description,Category, userId:req.user.id})
            .then(result=>{
                console.log(result);
                res.status(201).json({message:'Expense added',success:true})
            })
            .catch(err=>{
            console.log(err);
                res.status(500).json({error:'Something went wrong'})
            })
}
}

exports.showExpense = (req,res,next)=>{
    Expense.findAll({where:{userId :req.user.id }})
    .then(expenses=>{
        res.status(200).json({data:expenses,success:true, user:req.user})
    })
    .catch(err=>{
        res.status(500).json({err,success:false})
    })
}

exports.deleteExpense = (req,res,next) =>{
    const id = req.params.id
    console.log(req.params.id);
    Expense.destroy({where:{id:id, userId:req.user.id}})
    .then((NoofRows)=>{
        if(NoofRows === 0) {
            return res.status(404).json({success:false,message:'This Expense Does not belong to this user'})
        }
       return res.status(200).json({message:'Successfully deleted',success:true})
    })
    .catch(err=>{
    return res.status(403).json({message:'Failed',success:false})
    })
}