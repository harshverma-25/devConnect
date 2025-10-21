import mongoose from "mongoose";

const connectDB = async () => {     
    try{
        mongoose.connect(process.env.MONGO_URL)
        console.log("DB is connected")
    }
    catch(err){
        console.log ("DB is Not connected")
    }
}

export default connectDB;