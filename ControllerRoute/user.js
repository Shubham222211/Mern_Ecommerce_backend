const express=require('express')
const userRouter=express.Router()
const bcrypt=require('bcryptjs')
const userModel = require('../Models/User')
const jwt=require("jsonwebtoken")
const Authenticated = require('../Middlewares/isAuthenticated')


userRouter.post("/register",async(req,res)=>{

    const {name,email,password}=req.body
    try {

        let user=await userModel.findOne({email})

        if(user){
            return res.json({message:'user already exist',success:false})
        }
        const hashPass=await bcrypt.hash(password,5)
        user=await userModel.create({name,email,password:hashPass})
        res.json({message:"User Register Successfully!",user,success:true})
        
    } catch (error) {
        res.json({message:error.message})
    }
})


userRouter.post("/login",async (req,res)=>{

    const{email,password}=req.body
    try {
        let user=await userModel.findOne({email})
        if(!user){
            return res.json({message:"User Not Found",user,success:false})
        }
        const validPassword=await bcrypt.compare(password,user.password)
        if(!validPassword){
            return res.json({message:"Invalid Password",success:false})
        }

        // const token=jwt.sign({userId:user._id},process.env.SECRETKEY)
        const token = jwt.sign({ userId: user._id }, process.env.SECRETKEY, { expiresIn: '24h' });


        res.json({message:`Welcome ${user.name}`,token,success:true})
    } catch (error) {
        res.json({messgae:error.message})
    }
})
























userRouter.get("/getalluser",async (req,res)=>{

    try {
        let users=await userModel.find().sort({createdAt:-1})
        res.json(users)
    } catch (error) {
        res.json(error.message)
    }
})



// get profile

userRouter.get("/getprofile",Authenticated,(req,res)=>{
    res.json({user:req.user})
})


module.exports=userRouter