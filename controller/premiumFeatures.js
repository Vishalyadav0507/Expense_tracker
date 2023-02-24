const User=require('../model/signup')
const Expense=require('../model/expense')

const getUserLeaderBoard=async(req,res,next)=>{
    console.log(req)
    try{
        const users= await User.findAll()
        const expenses=await Expense.findAll()
        
        const ExpenseAmount={}

        expenses.forEach((expense)=>{
            if(ExpenseAmount[expense.userId]){
                ExpenseAmount[expense.userId]+=expense.amount
            }
            else{
                ExpenseAmount[expense.userId]=expense.amount
            }
        })

        const UserDeatils=[]
        users.forEach((user)=>{
            UserDeatils.push({Name:user.Name,amount:ExpenseAmount[user.id] || 0 })
        })
        
        console.log(UserDeatils)
        UserDeatils.sort((a,b)=>b.amount-a.amount)
        res.status(201).json(UserDeatils)
    }catch(err){
        console.log(err)
        res.status(501).json({err:err})
    }
}

module.exports ={
    getUserLeaderBoard
}