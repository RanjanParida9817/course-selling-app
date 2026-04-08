const mongoose = require('mongoose');

const db_url = process.env.MONGO_URI;
if(!db_url){
    console.log("FATAL ERROR! MongoDB crashed");
    process.exit(1);
}

const connectDB = async()=>{
    try{
        await mongoose.connect(db_url);
        console.log("MongoDB connected successfully!");

    } catch(error){
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;