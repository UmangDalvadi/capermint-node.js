import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Successfully connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error: ", error);
        process.exit(1);
    }
};

export default connectToDatabase;