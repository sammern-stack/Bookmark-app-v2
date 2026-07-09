import { connect } from "mongoose";
import { MONGO_URI } from "@/config/env.js";

export const connectDB = async () => {
  try {
    const conn = await connect(MONGO_URI);
    console.log(`Mongodb connected successfully: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error occurred while connecting to mongodb: ${err}`);
    process.exit(1);
  }
};
