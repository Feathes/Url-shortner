import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        console.error("❌ ERROR: MONGO_URI is missing from environment variables!");
        console.error("👉 Please add MONGO_URI to your production deployment environment settings.");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log("✅ Connected to MongoDB successfully");
    } catch (error) {
        console.error("❌ Error in connecting to MongoDB:", error.message);
        console.error("👉 If using MongoDB Atlas, ensure '0.0.0.0/0' is allowed in Network Access / IP Access List.");
    }
};

export default connectDB;