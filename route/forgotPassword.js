const express=require('express')
const router=express.Router()
const controller=require('../controller/forgotPassword')

router.use('/password/forgotpassword',controller.forgotPassword)

module.exports=router