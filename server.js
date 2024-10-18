const express=require('express')
const server=express()
const cors=require('cors')
const dotenv=require('dotenv')
const connected = require('./db')
const userRouter = require('./ControllerRoute/user')
const productRouter = require('./ControllerRoute/product')
const cartRouter = require('./ControllerRoute/cart')
const addressRouter = require('./ControllerRoute/address')
// const payRouter = require('./ControllerRoute/payment')


dotenv.config()

const PORT=process.env.PORT || 1001

// server.use(cors({
//     origin:'http://localhost:5173',credentials: true,
// }))


server.use(cors({
    origin:'*'
}))


server.use(express.json())



server.use("/user",userRouter)
server.use("/product",productRouter)
server.use("/cart",cartRouter)
server.use("/address",addressRouter)
// server.use("/payment",payRouter,)





server.get("/",(req,res)=>{

    res.send('MERN Stack server running fine! ')
})




server.listen(PORT,async()=>{

    try {
        await connected
        console.log(`server running on port ${PORT}`)
    } catch (error) {
       console.log(error) 
    }
})