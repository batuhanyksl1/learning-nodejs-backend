import mongoose from "mongoose";
import { env } from "./env";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log("🟢 MongoDB connected");
  } catch (error) {
    console.error(
      "🔴 MongoDB connection failed:",
      error instanceof Error ? error.message : error
    );
    process.exit(1);
  }
};
