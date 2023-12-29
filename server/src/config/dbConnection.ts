import mongoose from "mongoose";
import env from "../config/validateEnv";

const connectionString = env.MONGO_URI;

const dbConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(connectionString);
    console.log("MongoDB connected");
  } catch (err) {
    console.log(`${err}: did not connect`);
    process.exit(1);
  }
};

export default dbConnection;
