import mongoose from "mongoose";

const connectDB = async () => {     
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("DB is connected");
    } catch (err) {
        console.error("DB Connection Error:", err);
        throw err; // Re-throw the error to handle it in the caller
    }
};

export default connectDB;