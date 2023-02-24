const razorpay = require('razorpay')
// const jwt=require('jsonwebtoken')
const Order = require('../model/order')
const controller=require("../controller/signup")

// function generateToken(id,name,ispremium){
//     return jwt.sign({userId:id,name:name,ispremium:ispremium},"ThisIsAsecretKeyToEncrpytUserIdForSecureTheDataToHackedWriteAnyThing")
// }

const premimumMemberShip = async (req, res, next) => {
    try {
        var rzp = new razorpay({
            key_id: "rzp_test_hJWu32PuJtms05",
            key_secret: "bObjTtkIpIRpbfPvR9MgYlAM"
        })
        const amount = 2500

        rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
            if (err) {
                throw new Error(JSON.stringify(err))
            }
            req.user.createOrder({ orderId: order.id, status: "pending" }).then(() => {
                return res.status(201).json({ order, key_id: rzp.key_id })
            })
                .catch(err => {
                    console.log(err)
                })
        })
    } catch (err) {
        console.log(err)
    }
}

const updatetransaction = async(req,res,next) => {
    const userId=req.user.id
    try {
        const { payment_id, order_id } = req.body
        const order= await Order.findOne({ where: { orderId: order_id } })
        const promise1=await order.update({ paymentId: payment_id, status: "success" })
        const promise2=await req.user.update({ ispremium: true })
        Promise.all([promise1,promise2]).then((result)=>{
            res.status(205).json({message:"transaction successfull",token:controller.generateToken(userId,req.user.Name,true)})
        }).catch((err)=>{
            console.log(err)
        })
    }
    catch (err) {
        console.log(err)
        res.status(404).json({err:"something went wrong"})
    }
}

module.exports = { premimumMemberShip: premimumMemberShip,
    updatetransaction:updatetransaction}