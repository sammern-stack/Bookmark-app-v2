import mongoose from "mongoose";
import { config } from "./env.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongodbUri);
    console.log(`Mongodb connected successfully: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error occurred while connecting to mongodb: ${err}`);
    process.exit(1);
  }
};
