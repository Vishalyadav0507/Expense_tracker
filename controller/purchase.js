const razorpay = require('razorpay')
const Order = require('../model/order')
const controller=require("../controller/signup")


const premimumMemberShip = async (req, res, next) => {
    try {
        var rzp = new razorpay({
            key_id: process.env.key_id,
            key_secret:process.env.key_secret,
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
        const promise1= order.update({ paymentId: payment_id, status: "success" })
        const promise2= req.user.update({ ispremium: true })
        Promise.all([promise1,promise2]).then((result)=>{
            const k= controller.generateToken(userId,req.user.Name,true)
            console.log('k>>>>',k)
            console.log("responmse>>>>",result)
            return res.status(201).json({success:true,message:'transaction successfull',token:k})
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