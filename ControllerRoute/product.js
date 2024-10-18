const express=require('express')
const productModel = require('../Models/Product')
const productRouter=express.Router()



productRouter.post("/add",async (req,res)=>{

const {title,description,price,category,qty,imgSrc}=req.body

    try {
        let product=await productModel.create({
            title,description,price,category,qty,imgSrc
        })

        res.json({message:'Product added',product})
    } catch (error) {
        res.json({message:error.message})
    }
})



productRouter.get("/all",async (req,res)=>{

    
    
        try {
            let product=await productModel.find().sort({createdAt:-1})
    
            res.json({message:'All Product',product})
        } catch (error) {
            res.json({message:error.message})
        }
    })



    productRouter.get("/:id",async (req,res)=>{

    
    
        try {
            let product=await productModel.findById(req.params.id)

            if(!product) return res.json({message:"product not found"})
    
            res.json({message:'selected Product',product})
        } catch (error) {
            res.json({message:error.message})
        }
    })







    
    productRouter.put("/:id",async (req,res)=>{

    
    
        try {
            let product=await productModel.findByIdAndUpdate(req.params.id,req.body,{new:true})

            if(!product) return res.json({message:"product not found"})
    
            res.json({message:'Product updated successfully',product})
        } catch (error) {
            res.json({message:error.message})
        }
    })





    
    productRouter.delete("/:id",async (req,res)=>{

    
    
        try {
            let product=await productModel.findByIdAndDelete(req.params.id)

            if(!product) return res.json({message:"product not found"})
    
            res.json({message:'Product deleted successfully',product})
        } catch (error) {
            res.json({message:error.message})
        }
    })

module.exports=productRouter