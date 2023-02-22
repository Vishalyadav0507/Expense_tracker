const express =require('express');
const path=require('path')
const cors=require('cors')
const bodyParser = require('body-parser')

const sequelize=require('./util/datbase')
const signUpRoute=require('./route/signup')
const expenseRoute=require('./route/expense')

const app=express()
app.use(cors())

app.use(bodyParser.json({extended:false}))
app.use(express.static(path.join(__dirname, 'public')));

app.use(signUpRoute)
app.use(expenseRoute)

sequelize.sync()
.then(result=>{
    app.listen(3000)
})
.catch(err=>{
    console.log(err)
})
