const express = require('express')
const cartModel = require('../Models/Cart')
const Authenticated = require('../Middlewares/isAuthenticated')
const cartRouter = express.Router()


cartRouter.post("/addtocart",Authenticated, async (req, res) => {

    const { productId, title, price, qty, imgSrc } = req.body
    const userId = req.user


    let cart = await cartModel.findOne({ userId })

    if (!cart) {
        cart = new cartModel({ userId, items: [] })
    }

    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId)

    if (itemIndex > -1) {
        cart.items[itemIndex].qty += qty
        cart.items[itemIndex].price += price * qty
    } else {
        cart.items.push({ productId, title, price, qty, imgSrc })
    }

    await cart.save()

    res.json({ message: 'item added to cart', cart })

})



cartRouter.get("/getusercart",Authenticated, async (req, res) => {

    const userId = req.user

    let cart = await cartModel.findOne({ userId })
    if (!cart) return res.json({ message: 'Cart not found' })

    res.json({ message: 'user cart', cart })
})



cartRouter.delete("/delproduct/:productId", Authenticated,async (req, res) => {

    const productId = req.params.productId
    // not that that it is qual to id only in params
    const userId = req.user

    let cart = await cartModel.findOne({ userId })
    if (!cart) return res.json({ message: 'Cart not found' })

    cart.items = cart.items.filter((item) => item.productId.toString() !== productId)

    await cart.save()

    res.json({ message: 'product remove from cart' })
})



cartRouter.delete("/clearcart", Authenticated,async (req, res) => {

    const userId = req.user

    let cart = await cartModel.findOne({ userId })
    if (!cart) {
        cart = new cartModel({ items: [] })
    } else {
        cart.items = []
    }

    await cart.save()

    res.json({ message: 'cart cleared !' })
})






cartRouter.post("/decQty",Authenticated,async (req,res)=>{

    const {productId,qty}=req.body
    const userId=req.user


        let cart=await cartModel.findOne({userId})

if(!cart){
     cart=new cartModel({userId,items:[]})
}

    const itemIndex=cart.items.findIndex((item)=>item.productId.toString()===productId)    

    if(itemIndex>-1){

const item=cart.items[itemIndex]

if(item.qty>qty){
    const pricePerUnit=item.price/item.qty

    item.qty-=qty
    item.price-=pricePerUnit*qty
}else{
    cart.items.splice(itemIndex,1)
}

    }else{
        res.json({message:"invalid product id"})
    }

        

        await cart.save()

            res.json({message:'item qty decreases !',cart})

    })



module.exports = cartRouter