const mongoose=require('mongoose')

const cartSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    items:[
        {
            productId:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true},
            quantity:{type:Number,required:true,min:1}
    
    }
    ]
})


const cartModel=mongoose.model('Cart',cartSchema)


module.exports=cartModel