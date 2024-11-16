const express=require('express')
const connected = require('./db')
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const app=express()
const dotenv=require('dotenv').config()
const cors=require('cors')
const cartRouter = require('./CartRouter')
const authMiddleware = require('./Authmiddleware')



app.use(cors({
    origin:'*'
}))




app.use(express.json())
app.use('/user',userRouter)
app.use('/product',productRouter)
app.use('/cart',authMiddleware,cartRouter)

const PORT=process.env.PORT


app.get("/",(req,res)=>{
    res.send('ecomm server running fine')
})




app.listen(PORT,async ()=>{
try {
        await connected
        console.log(`server running on port ${PORT}`)
} catch (error) {
    console.log(error)  
}
})