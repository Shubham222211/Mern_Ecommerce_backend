const express=require('express')
const addressModal = require('../Models/Address')
const Authenticated = require('../Middlewares/isAuthenticated')

const addressRouter=express.Router()


addressRouter.post("/addressAdd",Authenticated,async(req,res)=>{

    const{fullName,address,city,state,country,pincode,phoneNumber}=req.body
    let userId=req.user

    

    let userAddress=await addressModal.create({
        userId,fullName,address,city,state,country,pincode,phoneNumber
    })

    res.json({message:'Address added successfully !',userAddress,success:true})
})




addressRouter.get("/getaddress",Authenticated,async(req,res)=>{

    let address=await addressModal.find({userId:req.user}).sort({createdAt:-1})
    res.json({message:"Address",userAddress:address[0]})
})






module.exports=addressRouter