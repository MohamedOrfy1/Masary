require("dotenv").config();
const mongoose = require('mongoose');

const connectDB = async () => {
    console.log("Connecting to MongoDB...");
    try{
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("MongoDB connected");
    }catch(err){
        console.log("MongoDB Not connected");
        console.error(err.message);
        process.exit(1);
    }
};
module.exports = connectDB;