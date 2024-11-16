const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }, 
    price: { type: Number, required: true }, 
    category: { type: String, required: true }, //  (e.g., electronics, clothing)
    imageUrl: { type: String }
})




const productModel=mongoose.model("Product",productSchema)

module.exports=productModel