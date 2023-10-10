const mongoose=require('mongoose');

const cartItemSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,

    },
    price:{
        type:Number,
        required:true,
    },
    user:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }],
    image:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
       
    },
    rating:{
        type:Number,
        required:true,
    },
});

module.exports=mongoose.model('CartItem',cartItemSchema);


// "title":"iphoneX",
//     "price": 4800,
//     "image":"https://picsum.photos/200/300",
//     "user":"6522f935f92ea88e047568e8",
//     "quantity":2,
//     "rating":4