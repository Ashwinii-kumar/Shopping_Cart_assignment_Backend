const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,

    },
    username:{
       type:String,
       required:true,
       
    },
    password:{
        type:String,
        required:true,
    },
    cartItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'CartItem',
    }],
    image:{
        type:String,
    }
});

module.exports=mongoose.model('User',userSchema);