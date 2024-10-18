
// const Razorpay = require("razorpay");
// const express = require('express');
// const Payment = require("../Models/Payment");
// const Authenticated = require("../Middlewares/isAuthenticated");
// const payRouter = express.Router();

// const razorpay = new Razorpay({
//     key_id: "rzp_live_C7ayx7PaJJkARf",
//     key_secret: "4BdgF5N5FitWBRBA6QwZrVwi "
// });

// payRouter.post("/checkout", async (req, res) => {
//     const { amount, cartItems, userShipping, userId } = req.body;

//     var options = {
//         amount: amount * 100,
//         currency: "INR",
//         receipt: `receipt_${Date.now()}`,
//     };

//     try {
//         const order = await razorpay.orders.create(options);

//         res.json({
//             orderId: order.id,
//             amount: amount,
//             cartItems,
//             userShipping,
//             userId,
//             payStatus: "created"
//         });
//     } catch (error) {
//         // Log the error and send an appropriate response
//         console.error("Error creating order: ", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to create Razorpay order",
//             error: error.message || error
//         });
//     }
// });


// payRouter.post("/verify-payment",async(req,res)=>{

//     const {orderId,paymentId,signature,amount,orderItems,userShipping}=req.body

//     let orderConfirm= await Payment.create({orderId,paymentId,signature,amount,orderItems,userShipping,payStatus: "paid"})

//     res.json({message:"Payment Successfull.. ",success:true,orderConfirm})
// })



// payRouter.get("/userorder",Authenticated,async(req,res)=>{

//     let userId=req.user._id.toString()
//     console.log(userId)
//     let orders=await Payment.find({userId:userId}).sort({orderDate:-1})
//     res.json(orders)
// })

// // all orders

// payRouter.get("/orders",Authenticated,async(req,res)=>{

    
//     let orders=await Payment.find().sort({orderDate:-1})
//     res.json(orders)
// })



// module.exports=payRouter

