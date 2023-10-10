const mongoose=require('mongoose');
//load env variables if not in production
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();

}

//define mongodb connection url
const uri=process.env.MONGODB_URI;



const dbConnect=()=>{
    //function to  establish a connection to mongodb db
    mongoose.connect(uri,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    });

//creates a reference to mongodb connection object created by connect function
    const connection=mongoose.connection;

    // defines an event listener that runs once the mongodb connection is  established successfully. when the connection is open it logs the message on console.
    // connection.once used to setup an event listener that listens for 'open' event and runs exactly once 
    connection.once('open',()=>{
        console.log("Mongodb connection established sucessfully");
    });

    // This code defines an event listener for any errors that occur during the database connection. If an error occurs, it logs an error message to the console.
    // sets up an event listener that continuously listens for the 'error' event on the MongoDB connection. If an error occurs during the connection or while interacting with the database, the provided callback function is executed, allowing you to handle and log the error appropriately.
    connection.on('error',(err)=>{
        console.error('Connection error',err);
    });
};

module.exports=dbConnect;

// In summary, once is used when you want to perform an action just once when a specific event occurs (e.g., when the database connection is opened), while on is used when you want to continuously listen for and handle events (e.g., handling errors that might occur during the connection).