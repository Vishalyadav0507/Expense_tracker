const bcrypt=require('bcrypt')
const jwt =require('jsonwebtoken')
const User = require('../model/signup')

function isstringvalidate(str) {
    if (str == undefined || str.length === 0) {
        return true
    }
    else {
        return false
    }
}

function generateToken(id,name,ispremium){
    return jwt.sign({userId:id,name:name,ispremium:ispremium},"ThisIsAsecretKeyToEncrpytUserIdForSecureTheDataToHackedWriteAnyThing")
}

const signUp = async (req, res, next) => {
    try{
        const { Name, Number, Email, Password } = req.body;
        if (isstringvalidate(Name) || isstringvalidate(Email) || isstringvalidate(Password)) {
            return res.status(400).json({ err: "something is missing" })
        }
        const findEmail=await User.findAll({where:{Email:Email}})
        console.log("hiii",findEmail)
        // if(findEmail.length>0){
        //     const saltRounds=10;
        //     bcrypt.hash(Password,saltRounds,async(err,hash)=>{
        //     await User.create({ Name, Number, Email, Password:hash})
        //     res.status(201).json({ message: "signUp successfully" })
        // })
        // }else{
        //     res.status(401).json({err:"user already registered"})
        // }
            const saltRounds=10;
            bcrypt.hash(Password,saltRounds,async(err,hash)=>{
            await User.create({ Name, Number, Email, Password:hash})
            res.status(201).json({ message: "signUp successfully" })
        })

    }
    catch(err){
        console.log("something>>>",err)
        res.status(500).json({ err: "something went wrong" })
    }
}

const login = async (req, res, next) => {
    try {
        const { Email, Password } = req.body
        const isData = await User.findAll({ where: { Email: Email } })
        if (isData){
            bcrypt.compare(Password,isData[0].Password,(err,result)=>{
                if(result==true){
                    return res.status(200).json({ message: "User Logged in succesfully",token:generateToken(isData[0].id,isData[0].Name,isData[0].ispremium) })
                }
                else{
                    return res.status(401).json({ message: "password mismatch" })
                }
            })
        } else {
            return res.status(404).json({ message: "user is not exist" })
        }
    }
    catch (err) {
        res.status(500).json({ message: "something went wrong" })
    }
}
module.exports = {
    signUp: signUp,
    isUser: login,
    generateToken:generateToken
}