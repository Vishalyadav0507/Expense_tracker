const expense=require('../model/expense')
const postItem=async(req,res,next)=>{
    try{
        const {amount,description,Item}=req.body
        const Expense=await expense.create({amount,description,Item})
        res.status(201).json({expense:Expense})
    }catch(err){
        res.status(404).json({err:"something went wrong"})
    }
}

const getItem=async(req,res)=>{
    try{
    const allData=await expense.findAll()
    res.status(201).json({expense:allData})
    }
    catch(err){
        res.status(501).json({err:"something went wrong"})
    }
}
const deleteItem=async(req,res,next)=>{
    try{
    const ItemId=req.params.id
    const response=await expense.destroy({where:{id:ItemId}})
    if(response==true){
        res.status(201).json({success:true})
    }
}catch(err){
    res.status(501).json({err:"something went wrong"})
}
}
module.exports={
    postItem:postItem,
    getItem:getItem,
    deleteItem:deleteItem
}