const express=require('express')
const router=express.Router()
const controller=require('../controller/expense')

router.use('/expense/addItem',controller.postItem)
router.use('/expense/getItem',controller.getItem)
router.use('/expense/deleteItem/:id',controller.deleteItem)

module.exports=router