import mongoose from "mongoose";
import createAdminUser from "../utils /createAdminUser.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected ${conn.connection.host}`);
    await createAdminUser();
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
