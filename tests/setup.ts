import mongoose from "mongoose";
import { connectDatabase } from "../src/config/database";

beforeAll(async () => {
  process.env.MONGO_URI =
    "mongodb://127.0.0.1:27017/batuhanyksl1-learning-node-js";
  await connectDatabase();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});
