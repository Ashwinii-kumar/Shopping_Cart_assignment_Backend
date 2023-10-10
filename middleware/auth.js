const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();



const auth=(req,res,next)=>{

    const token=req.cookies.token;

    if(!token){
        return res.status(400).json({
            message:"Unauthorized",
        });
    }

    try {
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    const userId=decoded.id;
    req.user={id:userId};
    next();    
    
    } catch (error) {
        return res.status(400).json({
            message:"Unauthorized",
        });
    }
       

}

module.exports={auth};