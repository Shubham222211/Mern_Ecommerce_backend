const mongoose=require('mongoose')
const dotenv=require('dotenv').config()

// const url='mongodb://127.0.0.1:27017/Ecomm'

const connected=mongoose.connect(process.env.MONGOURL)


module.exports=connected

