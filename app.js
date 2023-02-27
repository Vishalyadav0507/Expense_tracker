const express =require('express');
const path=require('path')
const cors=require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
dotenv.config()

const sequelize=require('./util/datbase')
const signUpRoute=require('./route/signup')
const expenseRoute=require('./route/expense')
const purchaseRoute=require('./route/purchase')
const premiumRoute=require('./route/premiumFeatures')
const forgotPasswordRoute=require('./route/forgotPassword')
// const resetPasswordRoutes = require('./route/resetPassword')

const User=require('./model/signup')
const Expense=require('./model/expense')
const Order=require('./model/order')
const Forgotpassword = require('./model/forgotPassword');

const app=express()
app.use(cors())

app.use(bodyParser.json({extended:false}))
app.use(express.static(path.join(__dirname, 'public')));

User.hasMany(Expense)
Expense.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

app.use(signUpRoute)
app.use(expenseRoute)
app.use(purchaseRoute)
app.use(premiumRoute)
app.use(forgotPasswordRoute)
// app.use('/password', resetPasswordRoutes)

sequelize.sync()
.then(result=>{
    app.listen(3000)
})
.catch(err=>{
    console.log(err)
})
