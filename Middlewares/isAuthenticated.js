const jwt=require('jsonwebtoken');
const userModel = require('../Models/User');


const Authenticated=async (req,res,next)=>{

    const token = req.headers.authorization.split(' ')[1];

    if(!token) return res.json({message:'Login First'})

        const decoded=jwt.verify(token,process.env.SECRETKEY)

        const id=decoded.userId

        let user=await userModel.findById(id)

        if(!user) return res.json({message:"User Not Found"})

            req.user=user
            next()

}

module.exports=Authenticated