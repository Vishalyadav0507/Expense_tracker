
const expense = require('../model/expense')
const User = require('../model/signup')
const sequelize = require('../util/datbase')

const postItem = async (req, res, next) => {
    try {
        const t= await sequelize.transaction()
        const { amount, description, Item, } = req.body
        const userId = req.user.id
        const Expense = await expense.create({ amount, description, Item, userId },{transaction:t})
        const totalExpense = Number(req.user.total_amount) + Number(amount)
        User.update({
            total_amount: totalExpense
        }, {where: { Id: req.user.id }},
        {transaction:t})
        await t.commit()
        res.status(201).json({ expense: Expense })
    } catch (err) {
        await t.rollback()
        res.status(501).json({ err: "something went wrong" })
    }
}

const getItem = async (req, res) => {
    try {
        const allData = await expense.findAll({ where: { userId: req.user.id } })
        res.status(201).json({ expense: allData })
    }
    catch (err) {
        console.log(err)
        res.status(501).json({ err: "something went wrong" })
    }
}
const deleteItem = async (req, res, next) => {
    try {
        const t=await sequelize.transaction()
        const ItemId = req.params.id
        const gettingExpenseDetails= await expense.findAll({where:{id:ItemId}})
        const UserDetails=await User.findAll({where:{id:gettingExpenseDetails[0].userId}})
        const response = await expense.destroy({ where: { id: ItemId, userId: req.user.id } })
        if (response == true) {
            res.status(201).json({ success: true })
            const deletedAmount=gettingExpenseDetails[0].amount
            const UserTotalAmount=UserDetails[0].total_amount
            const remmainingAmount=Number(UserTotalAmount)-Number(deletedAmount)
            User.update({
                total_amount:remmainingAmount
            },{where:{id:gettingExpenseDetails[0].userId}},{transaction:t})
            await t.commit()
        }
    } catch (err) {
        await t.rollback()
        res.status(501).json({ err: "something went wrong" })
    }
}
module.exports = {
    postItem: postItem,
    getItem: getItem,
    deleteItem: deleteItem
}