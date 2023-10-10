// const cookieParser=require('cookie-parser');

const logout=async(req,res)=>{
    res.cookie('token','',{
        expires:new Date(0),
        httpOnly:true,
    });

    return res.status(200).json({
        success:true,
        message:"Logout Successful",
    });
};

module.exports={logout};
