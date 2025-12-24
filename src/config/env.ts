import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ["JWT_SECRET", "MONGO_URI"] as const;

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export const env = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET!,
  mongoUri: process.env.MONGO_URI!,
};
