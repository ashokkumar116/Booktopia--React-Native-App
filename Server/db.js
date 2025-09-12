const mongoose  = require("mongoose");
require("dotenv").config();


const connectDB = async ()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log("✔️ MongoDB Connected at",connection.connection.host);
        console.log(`📂 Using DB: ${connection.connection.name}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;