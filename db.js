const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()


const connected=mongoose.connect(process.env.MONGO_URL)

module.exports=connected