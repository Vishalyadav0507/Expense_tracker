const User=require('../model/signup')
const Expense=require('../model/expense')
const sequelize = require('../util/datbase')

const getUserLeaderBoard=async(req,res,next)=>{
    try{
        const leaderboardData = await User.findAll({
            attributes: ['id', 'name', [sequelize.fn('SUM', sequelize.col('expenses.amount')), 'total_expenses']],
            include: [{
                model: Expense,
                attributes: []
            }],
            group: ['User.id']
        })
        res.status(201).json(leaderboardData)
    }catch(err){
        console.log(err)
        res.status(501).json({err:err})
    }
}

module.exports ={
    getUserLeaderBoard
}

